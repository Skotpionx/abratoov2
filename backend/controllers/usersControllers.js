const bcrypt = require('bcryptjs');
const User = require("../models/userModel")

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};


exports.getUserByDNI = async (req, res) => {
  try {
    const { dni } = req.params;
    const user = await User.findOne({ dni });

    if (user) {
      // Ya existe un usuario con ese DNI
      return res.status(200).json({ exists: true });
    }

    // No se encontró ningún usuario con ese DNI
    res.status(200).json({ exists: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error interno del servidor' }, err);
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      // Ya existe un usuario con ese email
      return res.status(200).json({ exists: true });
    }

    // No se encontró ningún usuario con ese email
    res.status(200).json({ exists: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error interno del servidor' }, err);
  }
};


exports.createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateUser = async (req, res) => {
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

