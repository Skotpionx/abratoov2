import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Badge } from 'react-bootstrap';
import '../styles/column.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const Column = ({ column }) => {

  const [userMap, setUserMap] = useState(new Map());
  const [imageMap, setImageMap] = useState(new Map());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${API_URL}/users/usersName`, { withCredentials: true });
        const users = response.data;
        const map = new Map();
        const imageMap = new Map();
        users.forEach(user => {
          map.set(user._id, user.nombre);
          imageMap.set(user._id, user.imagenes[0]);
        });

        setUserMap(map);
        setImageMap(imageMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

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
                  
                  <div className="userInfo"> 
                    <Badge> {userMap.get(item.idUsuario)} </Badge>
                    <img src={imageMap.get(item.idUsuario)} alt="User Image" style={{ width: '50px', height: '50px' }} />
                  </div>

                  <div className="issueReservaInfo">
                    <span> Tipo de reserva: {item.tipo} </span>
                    <span> Hora: {new Date(item.fecha).toLocaleString()} </span> 
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
