import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, Select, MenuItem, TextField, Avatar } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const AdminPanelReservas = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [reservaData, setReservaData] = useState([]);
  const [tatuadores, setTatuadores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservaResponse, tatuadoresResponse, usuariosResponse] = await Promise.all([
          axios.get(`${API_URL}/reserva/getAllReservas`, { withCredentials: true }),
          axios.get(`${API_URL}/users/tatuadores`, { withCredentials: true }),
          axios.get(`${API_URL}/admin/users`, { withCredentials: true })
        ]);

        setReservaData(reservaResponse.data);
        setTatuadores(tatuadoresResponse.data);
        setUsuarios(usuariosResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditData(prevData => ({ ...prevData, fecha: date }));
  };

  const handleEditReserva = (reservaId) => {
    const reserva = reservaData.find(reserva => reserva._id === reservaId);
    reserva.fecha = new Date(reserva.fecha); // Convertir de nuevo la fecha a un objeto Date
    setEditData(reserva);
    setEditMode(reservaId);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${API_URL}/reserva/editAdminReserva/${editData._id}`, editData, { withCredentials: true });
      setEditMode(null);
      const reservaResponse = await axios.get(`${API_URL}/reserva/getAllReservas`, { withCredentials: true });
      setReservaData(reservaResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
      {reservaData.map((reserva) => (
        <Box key={reserva._id} p={1} m={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              {editMode === reserva._id ? (
                <>
                  <Box display="flex" alignItems="center">
                    <Select
                      name="idTatuador"
                      value={editData.idTatuador}
                      onChange={handleInputChange}
                      style={{ marginRight: '10px' }}
                    >
                      {tatuadores.map((tatuador) => (
                        <MenuItem key={tatuador.idTatuador} value={tatuador.idTatuador}>
                          {tatuador.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    <Avatar src={tatuadores.find(tatuador => tatuador.idTatuador === editData.idTatuador)?.imagenes[0]} />
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Select
                      name="idUsuario"
                      value={editData.idUsuario}
                      onChange={handleInputChange}
                      style={{ marginRight: '10px' }}
                    >
                      {usuarios.map((usuario) => (
                        <MenuItem key={usuario._id} value={usuario._id}>
                          {usuario.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    <Avatar src={usuarios.find(usuario => usuario._id === editData.idUsuario)?.imagenes[0]} />
                  </Box>

                  <DatePicker
                    selected={editData.fecha}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Hora"
                    dateFormat="dd/MM/yyyy h:mm aa"
                  />

                  <Select
                    name="tipo"
                    value={editData.tipo}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Valoración">Valoración</MenuItem>
                    <MenuItem value="Tatuaje">Tatuaje</MenuItem>
                    <MenuItem value="Curación">Curación</MenuItem>
                  </Select>

                  <Select
                    name="estadoReserva"
                    value={editData.estadoReserva}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Pendiente de Aprobación">Pendiente de Aprobación</MenuItem>
                    <MenuItem value="Aceptadas">Aceptadas</MenuItem>
                    <MenuItem value="Completadas">Completadas</MenuItem>
                    <MenuItem value="Canceladas">Canceladas</MenuItem>
                  </Select>

                  <Button variant="contained" color="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setEditMode(null)}>Cancelar</Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="div">{`Reserva ID: ${reserva._id}`}</Typography>
                  <Typography variant="body2" color="textSecondary">{`Tatuador ID: ${reserva.idTatuador}`}</Typography>
                  <Typography variant="body2">{`Usuario ID: ${reserva.idUsuario}`}</Typography>
                  <Typography variant="body2">{`Fecha: ${new Date(reserva.fecha).toLocaleDateString()}`}</Typography>
                  <Typography variant="body2">{`Tipo: ${reserva.tipo}`}</Typography>
                  <Typography variant="body2">{`Estado: ${reserva.estadoReserva}`}</Typography>
                  <Button variant="contained" color="secondary" onClick={() => handleEditReserva(reserva._id)}>Editar reserva</Button>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default AdminPanelReservas;
