'use client'
import React, { useState } from 'react';
import axios from 'axios'

const GetUsersComponent = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth`, {withCredentials: true});
      const data = response.data;
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        nombre,
        password
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUser = () => {
    createUser();
    setNombre('');
    setPassword('');
  };

  return (
    <div>
      <h1>Get Users</h1>
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <div>
        <h2>Get All Users</h2>
        <button onClick={getUsers}>Get Users</button>
      </div>
    </div>
  );
};

export default GetUsersComponent;
