import React , { useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/font.css'
import TatuadorKanban from "./tatuadorKanban"


const ViewReservaCard = ( {userData} ) => {
    const [ userReserva, setuserReserva] = useState(null);
    const [ tatuadorReserva, setTatuadorReserva] = useState(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    useEffect( () => {
        if(!userData.esTatuador){
            const obtenerReservas = async () =>{
                try {
                    const response = await axios.get(`${API_URL}/reserva/obtenerReservaPorUsuario/${userData._id}`, { withCredentials: true });
                    setuserReserva(response.data)
                } catch (error) {
                    console.log(error);
                }
            }
            obtenerReservas();
        }else{
            const obtenerReservasTatuador = async() => {
                try{
                    const responseIDTatuador = await axios.get(`${API_URL}/reserva/getIDTatuador/${userData._id}`, { withCredentials: true});
                    const response = await axios.get(`${API_URL}/reserva/getReservas/${responseIDTatuador.data}`, { withCredentials: true});

                    setTatuadorReserva(response.data);
                }catch(error){
                    console.log(error);
                }       
            }
            obtenerReservasTatuador();
        }
    }, [])


    return (
        <div>
            {userReserva && userReserva[0] && userReserva[0].fecha &&
                <p> Aqui {new Date(userReserva[0].fecha).toLocaleString()}  </p>
            }
            {userData.esTatuador && tatuadorReserva && (
                <TatuadorKanban reservas={tatuadorReserva} />
            )}
        
        </div>
    )
}

export default ViewReservaCard