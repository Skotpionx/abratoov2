import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/font.css';
import TatuadorKanban from "./tatuadorKanban"
import "../styles/viewReservaCard.css"

const ViewReservaCard = ({ userData }) => {
  const [userReserva, setuserReserva] = useState(null);
  const [tatuadorReserva, setTatuadorReserva] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => { 
   if (!userData.esTatuador) {
      const obtenerReservas = async () => {
        try {
          const response = await axios.get(`${API_URL}/reserva/obtenerReservaPorUsuario/${userData._id}`, { withCredentials: true });
          setuserReserva(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      obtenerReservas();
    } else {
      const obtenerReservasTatuador = async () => {
        try {
          console.log(userData._id);
          const responseIDTatuador = await axios.get(`${API_URL}/reserva/getIDTatuador/${userData._id}`, { withCredentials: true });
          console.log(responseIDTatuador.data);
          const response = await axios.get(`${API_URL}/reserva/getReservas/${responseIDTatuador.data}`, { withCredentials: true });
          console.log(response.data);
          setTatuadorReserva(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      obtenerReservasTatuador();
    }
  }, []);

  return (
        <div>
            {userReserva && (
              <>
                <p className="userDataInformation"> Puedes cancelar las reservas moviéndolas a "Canceladas", este proceso no tiene vuelta atrás. </p>
                <TatuadorKanban reservas={userReserva}  esTatuador={userData.esTatuador} />
              </>
            )}
            {userData.esTatuador && tatuadorReserva && (
              <TatuadorKanban reservas={tatuadorReserva}  esTatuador={userData.esTatuador} />
            )}
        </div>
  );
};

export default ViewReservaCard;
