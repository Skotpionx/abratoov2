import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './column';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/kanban.css"

const TatuadorKanban = ({ reservas , esTatuador}) => {
  const [columns, setColumns] = useState({
    "Pendiente de Aprobación": { name: "Pendiente de Aprobación", items: [] },
    "Aceptadas": { name: "Aceptadas", items: [] },
    "Completadas": { name: "Completadas", items: [] },
    "Canceladas": { name: "Canceladas", items: [] }
  });

  useEffect(() => {
    const newColumns = { ...columns };
    reservas.forEach(reserva => {
      newColumns[reserva.estadoReserva].items.push(reserva);
    });
    setColumns(newColumns);
  }, [reservas]);


  
  const onDragEnd = async (result, columns, setColumns) => {
    const { source, destination } = result;

    // Si no hay un destino (el usuario dejó el elemento fuera de cualquier columna), no hacemos nada
    if (!destination) return;

    // Si la columna de origen y destino son las mismas y el índice de origen y destino son los mismos, no hacemos nada
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Copiamos la columna de origen
    const startColumn = columns[source.droppableId];
    const newStartItems = [...startColumn.items];

    // Sacamos el elemento de la columna de origen
    const [removedItem] = newStartItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
        // Si la columna de origen y destino son las mismas, volvemos a meter el elemento en su nueva posición
        newStartItems.splice(destination.index, 0, removedItem);
        const newColumn = {
            ...startColumn,
            items: newStartItems,
        };

        setColumns({
            ...columns,
            [newColumn.name]: newColumn,
        });
    } else {
        // Si las columnas de origen y destino son diferentes, metemos el elemento en su nueva posición en la columna de destino
        const endColumn = columns[destination.droppableId];
        const newEndItems = [...endColumn.items];

      if (!esTatuador && destination.droppableId !== "Canceladas") {
        return;
      }

        newEndItems.splice(destination.index, 0, removedItem);
        const newStartColumn = {
            ...startColumn,
            items: newStartItems,
        };
        const newEndColumn = {
            ...endColumn,
            items: newEndItems,
        };

        setColumns({
            ...columns,
            [newStartColumn.name]: newStartColumn,
            [newEndColumn.name]: newEndColumn,
        });
        const endStateName = Object.entries(columns).find(([id]) => id === destination.droppableId)[1].name;
        try{
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const path = esTatuador ? '/reserva/moverReserva/' : '/reserva/moverReservaCancelada/';
          const response = await axios.put(`${API_URL}${path}${removedItem._id}`, { estado: endStateName } , {withCredentials: true });
          console.log(response.data);
        }catch(error){
          console.error(error);
        }


    }
};


  return (
    <div className='boardContainer'>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Droppable droppableId={id} key={id}>
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                    className='kanban'
                  >
                    <h4>{column.name}</h4>
                    <Column column={column} esTatuador={esTatuador}/>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>

          );
        })}
      </DragDropContext>
    </div>
  );
};

export default TatuadorKanban;
