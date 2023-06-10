import { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/reservaCard.css'

const ReservaCard = ({ tatuadores }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [tipo, setTipo] = useState('');
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState({
    tatuador: '',
    fecha: '',
    tipo: '',
  });
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    let validationErrors = {};

    if(!inputValue) {
      validationErrors.tatuador = "Elige un tatuador";
    }
    if(!selectedDate) {
      validationErrors.fecha = "Selecciona una fecha y hora";
    }
    if(!tipo) {
      validationErrors.tipo = "Elige un tipo de reserva";
    }
    if(Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
      try{
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const authResponse = await axios.get(`${API_URL}/auth/status`, {withCredentials: true});
        if(!authResponse.data.isAuthenticated){
          window.location.href = '/auth';
          return;
        }    
        else if( authResponse.data.isAuthenticated){
          try{
            const reservaResponse = await axios.post(`${API_URL}/reserva/createReserva`,{
              idTatuador: inputValue,
              fecha: selectedDate,
              tipo: tipo,
            }, { withCredentials: true});
            if (reservaResponse.status === 201) {
              setError({}); // Limpia los errores
              window.location.href = '/auth';
            }
          }catch(error){
            if(error.response.status === 400){
              setError(prevErrors => ({
                ...prevErrors,
                fecha: 'Ya hay una reserva para esa hora',
              }))
            }
            else if( error.response.status === 410){
              setError(prevErrors => ({
                ...prevErrors,
                fecha: 'No se permite reservar en sábado ni en domingo.',
              }))
            }
            else if( error.response.status === 420){
              setError(prevErrors => ({
                ...prevErrors,
                fecha: 'Esto no son horas de una reserva...',
              }))
            }
          }
        }    
      }
      catch(error){
        console.error(error);
      }
  }

  const transformReservas = (reservas) => {
    return reservas.map(reserva => {
      const fecha = new Date(reserva.fecha);
      
      return {
        ...reserva,
        fecha: {
          day: fecha.getDate(),
          month: fecha.getMonth() + 1,  // en js los meses empiezan en 0
          year: fecha.getFullYear(),
          hours: fecha.getHours(),
          minutes: fecha.getMinutes()
        }
      };
    });
  };

  const getTomorrow = () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };



  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const fetchReservas = async (tatuadorId) => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${API_URL}/reserva/getReserva/${tatuadorId}`, { withCredentials: true });
        if (response.status === 200) {
          const reservasFormatted = transformReservas(response.data);
          setReservas(reservasFormatted);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservas(e.target.value);
  };

  const filterWeekends = (date) =>{
    const day = date.getDay();
    //aqui el 0 es domingo y el 6 es sabado 
    return day !== 0 && day !== 6
  }

  const filterWorksHours = (time, reservas) => {
    const hour = time.getHours();
  
    // Verificar si la hora está dentro del horario de trabajo
    const isWorkingHour = (hour >= 8 && hour < 14) || (hour >= 16 && hour < 20);
  
    if (isWorkingHour) {
      // Verificar si la hora está reservada
      const isHourReserved = reservas.some(reserva => {
        return (
          reserva.fecha.hours === hour &&
          reserva.fecha.day === time.getDate() &&
          reserva.fecha.month === time.getMonth() + 1 && // Los meses en JavaScript empiezan en 0
          reserva.fecha.year === time.getFullYear() &&
          reserva.fecha.minutes === time.getMinutes()
        );
      });
  
      return !isHourReserved;
    }
  
    return false;
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  return (
    <Form style={{ minHeight:"50vh"}} className="formReservaCard">
      <Form.Group controlId="formTatuadores" className="tatuadorBlock">
        <Form.Label>Elige un tatuador:</Form.Label>
        <Form.Control
          as="select"
          value={inputValue}
          onChange={handleInputChange}
          required
          isInvalid={!!error.tatuador}
          className="tatuadorSelect"
        >
          <option value="">-- Por favor selecciona --</option>
          {tatuadores.map(tatuador => 
            <option key={tatuador.idTatuador} value={tatuador.idTatuador}>
              {tatuador.nombre}
            </option>
          )}
        </Form.Control>
        <Form.Control.Feedback type='invalid'>{error.tatuador}</Form.Control.Feedback>
      </Form.Group>

      {inputValue && (
        <Form.Group controlId="formFecha" className="fechaInput">
          <Form.Label>Selecciona la fecha y hora:</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            filterDate={filterWeekends}
            filterTime={(time) => filterWorksHours(time, reservas)}
            minDate={getTomorrow()}
            required

            className={error.fecha && 'is-invalid'}
          />
          {error.fecha && <div className='invalid-feedback'>{error.fecha}</div>}
        </Form.Group>
      )}

      {selectedDate && inputValue &&(
        <Form.Group controlId="formTipo">
          <Form.Label>Tipo de reserva:</Form.Label>
          <Form.Control
            as="select"
            value={tipo}
            onChange={handleTipoChange}
            required
            isInvalid={!!error.tipo}
            className="tipoSelect"
          >
            <option value="">-- Por favor selecciona --</option>
            <option value="Valoración">Valoración</option>
            <option value="Tatuaje">Tatuaje</option>
            <option value="Curación">Curación</option>
          </Form.Control>
          <Form.Control.Feedback type='invalid'>{error.tipo}</Form.Control.Feedback>
        </Form.Group>
      )}
      {tipo && selectedDate && inputValue &&(
        <p
        style={{ cursor: "pointer", marginTop: "5%"}}
        className="boxShadow confirmationReserva"
        onClick={handleSubmit}
        > Crear Reserva </p>
      )}
    </Form>
  );
};

export default ReservaCard;
