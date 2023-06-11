import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

const AdminPanelTatuadores = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [tatuadorData, setTatuadorData] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchTatuadores = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/tatuadores`, { withCredentials: true });
        setTatuadorData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTatuadores();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`${API_URL}/admin/editTatuador/${editData.idTatuador}`, editData, { withCredentials: true });
      console.log(response.data);
      if (response.status === 200) {
        setTatuadorData(tatuadorData.map(tatuador => tatuador.idTatuador === editData.idTatuador ? { ...tatuador, ...editData } : tatuador));
        setEditMode(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = (tatuadorId) => {
    const tatuador = tatuadorData.find(tatuador => tatuador.idTatuador === tatuadorId);
    setEditData(tatuador);
    setEditMode(tatuadorId);
  };

  return (
    <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
      {tatuadorData.map((tatuador) => (
        <Box key={tatuador.idTatuador} p={1} m={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={tatuador.imagenes[0] ? tatuador.imagenes[0] : '/minion.png'}
              alt="tatuador image"
              style={{ objectFit:"contain"}}
            />
            <CardContent>
              {editMode === tatuador.idTatuador ? (
                <>
                    <TextField
                    name="experiencia"
                    label="Experiencia"
                    defaultValue={editData.experiencia}
                    onChange={handleInputChange}
                    />
                    <TextField
                    name="ubicacion"
                    label="Ubicacion"
                    defaultValue={editData.ubicacion}
                    onChange={handleInputChange}
                    />
                  <Button variant="contained" color="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditMode(null)}>Cancelar</Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="div">{tatuador.nombre}</Typography>
                  <Typography variant="body2" color="textSecondary">{tatuador.pseudonimo}</Typography>
                  <Typography variant="body2">{`Experiencia: ${tatuador.experiencia}`}</Typography>
                  <Typography variant="body2">{`Ubicacion: ${tatuador.ubicacion}`}</Typography>
                  <Button variant="contained" color="secondary" onClick={() => handleEditProfile(tatuador.idTatuador)}>Editar perfil</Button>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default AdminPanelTatuadores;
