import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

const AdminPanel = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [userData, setUserData] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/users`, { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleCrearTatuador = async (userId) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const tatuadorData = {
        "valoracionMedia": 0,
        "experiencia": 0,
        "ubicacion": "",
      };
      const response = await axios.post(`${API_URL}/users/tatuadores/${userId}`, tatuadorData, { withCredentials: true });
      if (response.status === 201) {
        const userUpdateData = {
          "esTatuador": true,
        };
        const responseUser = await axios.put(`${API_URL}/admin/users/${userId}`, userUpdateData, { withCredentials: true });
        if (responseUser.status === 200) {
          // Actualiza la lista de usuarios en el estado
          setUserData(userData.map(user => user._id === userId ? { ...user, esTatuador: true } : user));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeshacerTatuador = async (userId) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.delete(`${API_URL}/admin/eliminarTatuador/${userId}`, { withCredentials: true });
      if (response.status === 200) {
        // Actualiza la lista de usuarios en el estado
        setUserData(userData.map(user => user._id === userId ? { ...user, esTatuador: false } : user));
      }
    } catch (error) {
      console.error(error);
    }
};
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSaveChanges = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.put(`${API_URL}/admin/editUser/${editData._id}`, editData, { withCredentials: true });
      if (response.status === 200) {
        setUserData(userData.map(user => user._id === editData._id ? { ...user, ...editData } : user));
        setEditMode(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

const handleEditProfile = (userId) => {
    const user = userData.find(user => user._id === userId);
    setEditData(user);
    setEditMode(userId);
  };
  

  return (
    <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
      {userData.map((user) => (
        <Box key={user._id} p={1} m={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={user.imagenes[0] ? user.imagenes[0] : '/minion.png'}
              alt="user image"
              style={{ objectFit:"contain"}}
            />
            <CardContent>
              {editMode === user._id ? (
                <>
                    <TextField
                    name="nombre"
                    label="Nombre"
                    defaultValue={editData.nombre}
                    onChange={handleInputChange}
                    />
                    <TextField
                    name="pseudonimo"
                    label="Pseudonimo"
                    defaultValue={editData.pseudonimo}
                    onChange={handleInputChange}
                    />
                    <TextField
                    name="direccion"
                    label="Direccion"
                    defaultValue={editData.direccion}
                    onChange={handleInputChange}
                    />
                    <TextField
                    name="dni"
                    label="DNI"
                    defaultValue={editData.dni}
                    onChange={handleInputChange}
                    />
                    <TextField
                    name="edad"
                    label="Edad"
                    defaultValue={editData.edad}
                    onChange={handleInputChange}
                    />
                    <TextField
                    name="email"
                    label="Email"
                    defaultValue={editData.email}
                    onChange={handleInputChange}
                    />
                    <TextField
                    name="telefono"
                    label="Telefono"
                    defaultValue={editData.telefono}
                    onChange={handleInputChange}
                    />
                  <Button variant="contained" color="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditMode(null)}>Cancelar</Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="div">{user.nombre}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.pseudonimo}</Typography>
                  <Typography variant="body2">{user.direccion}</Typography>
                  <Typography variant="body2">{user.dni}</Typography>
                  <Typography variant="body2">{user.edad}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                  <Typography variant="body2">{user.telefono}</Typography>
                  {!user.esTatuador && <Button variant="contained" color="primary" onClick={() => handleCrearTatuador(user._id)}>Crear tatuador</Button>}
                  {user.esTatuador && <Button variant="contained" color="primary" onClick={() => handleDeshacerTatuador(user._id)}>Deshacer tatuador</Button>}
                  <Button variant="contained" color="secondary" onClick={() => handleEditProfile(user._id)}>Editar perfil</Button>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default AdminPanel;
