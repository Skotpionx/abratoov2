import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Badge, Form, Button } from 'react-bootstrap';
import { Typography } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/column.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Column = ({ column , esTatuador}) => {
  const [editingItem, setEditingItem] = useState(null);
  const [userMap, setUserMap] = useState(new Map());
  const [imageMap, setImageMap] = useState(new Map());
  const [userId, setUserId] = useState('');
  const [tipo, setReservationType] = useState('');
  const [originalValues, setOriginalValues] = useState({});

  const handleUserChange = (event) => {
    setUserId(event.target.value);
  }

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [minTime, setMinTime] = useState(new Date());
  const [maxTime, setMaxTime] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const nextHalfHour = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() >= 30 ? 60 : 30
    );
    setSelectedDateTime(nextHalfHour);
    setMinTime(nextHalfHour);

    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59
    );
    setMaxTime(endOfDay);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDateTime(date);
    const now = new Date();

    if (date.getDate() !== minTime.getDate() || date.getMonth() !== minTime.getMonth() || date.getFullYear() !== minTime.getFullYear()) {
      if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        const nextHalfHour = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes() >= 30 ? 60 : 30
        );
        setMinTime(nextHalfHour);
      } else {
        setMinTime(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0));
      }
      
      setMaxTime(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59));
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const updatedFields = {};
    updatedFields.idUsuario = userId !== originalValues.userId ? userId : originalValues.userId;
    updatedFields.tipo = tipo !== originalValues.tipo ? tipo : originalValues.tipo;
    updatedFields.fecha = selectedDateTime.getTime() !== originalValues.date.getTime() 
      ? new Date(selectedDateTime.getTime() + selectedDateTime.getTimezoneOffset() * 60000 + 2 * 60 * 60 * 1000) // Add 2 hours in milliseconds
      : originalValues.date;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.put(`${API_URL}/reserva/editReserva/${editingItem}`, updatedFields , {withCredentials: true });
      if (response.status === 200) {
        setOriginalValues(updatedFields);
      }
    } catch(error) {
      console.error(error);
    }

    // Restablecer el estado de edición
    setEditingItem(null);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const userType = esTatuador ? '/users/usersName' : '/users/tatuadores'; 
        const response = await axios.get(`${API_URL}${userType}`, { withCredentials: true });
        const users = response.data;
        const map = new Map();
        const imageMap = new Map();
        if(!esTatuador){
          users.forEach(user => {
            map.set(user.idTatuador, user.nombre);
            imageMap.set(user.idTatuador, user.imagenes[0]);
          });
        }
        else{
          users.forEach(user => {
            map.set(user._id, user.nombre);
            imageMap.set(user._id, user.imagenes[0]);
          });
        }
        setUserMap(map);
        setImageMap(imageMap);
        console.log();
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [esTatuador]);

  return (
    <div className="columnasContainer">
      {column.items.map((item, index) => {
        return (
          <Draggable key={item._id} draggableId={item._id} index={index}>
            {(provided) => {
              return (
                <div
                  className="kanbanIssuesContainer"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                <div onDoubleClick={() => {
                  if (esTatuador) { //Comprobamos si es tatuador o no 
                    setEditingItem(item._id);
                    setUserId(item.idUsuario);
                    setReservationType(item.tipo);
                    setSelectedDateTime(new Date(item.fecha));
                    setOriginalValues({
                      userId: item.idUsuario,
                      tipo: item.tipo,
                      date: new Date(item.fecha),
                    });
                  }
                }}>
                    {editingItem === item._id  ? (
                      <Form onSubmit={handleFormSubmit}>
                        <Typography variant="h6">Editar Reserva</Typography>
                        <Form.Group>
                          <Form.Label>Usuario</Form.Label>
                          <Form.Control as="select" value={userId} onChange={handleUserChange}>
                            {Array.from(userMap.entries()).map(([id, nombre]) => (
                              <option value={id}>{nombre}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                        
                        <Form.Group>
                          <Form.Label>Fecha y Hora</Form.Label>
                          <DatePicker
                            selected={selectedDateTime}
                            onChange={handleDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="Hora"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minDate={new Date()}
                            minTime={minTime}
                            maxTime={maxTime}
                            />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Tipo de Reserva</Form.Label>
                          <Form.Control as="select" value={tipo} onChange={e => setReservationType(e.target.value)}>
                            <option value="Valoración">Valoración</option>
                            <option value="Tatuaje">Tatuaje</option>
                            <option value="Curación">Curación</option>
                          </Form.Control>
                        </Form.Group>

                        <Button type="submit">Guardar</Button>
                        <Button type="button" variant="secondary" onClick={() => setEditingItem(null)}>Cancelar</Button>
                      </Form>
                    ) : (
                      <>
                        <div className="userInfo"> 
                          <Badge>{userMap.get(item.idUsuario ? item.idUsuario : item.idTatuador)}</Badge>
                          <img src={imageMap.get(item.idUsuario ? item.idUsuario : item.idTatuador)} alt="User Image" style={{ width: '50px', height: '50px' }} />
                        </div>

                        <div className="issueReservaInfo">
                          <span> Tipo de reserva: {item.tipo} </span>
                          <span> Hora: {new Date(item.fecha).toLocaleString()} </span> 
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            }}
          </Draggable>
        );
      })}
    </div>
  );
};

export default Column;
