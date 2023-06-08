import { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/reservaCard.css'

const ReservaCard = ({ tatuadores }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [tipo, setTipo] = useState('');
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
          const reservaResponse = await axios.post(`${API_URL}/reserva/createReserva`,{
            idTatuador: inputValue,
            fecha: selectedDate,
            tipo: tipo,
          }, { withCredentials: true});
          if (reservaResponse.status === 201) {
            setError({}); // Limpia los errores
            window.location.href = '/auth';
          }
        }    
      }
      catch(error){
        console.error(error);
      }
  }


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterWeekends = (date) =>{
    const day = date.getDay();
    //aqui el 0 es domingo y el 6 es sabado 
    return day !== 0 && day !== 6
  }

  const filterWorksHours = (time) => {
    const hour = time.getHours();

    return (hour >= 8 && hour < 14) || (hour >= 16 && hour < 20)
  }

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  return (
    <Form style={{ minHeight:"50vh"}}>
      <Form.Group controlId="formTatuadores">
        <Form.Label>Elige un tatuador:</Form.Label>
        <Form.Control
          as="select"
          value={inputValue}
          onChange={handleInputChange}
          required
          isInvalid={!!error.tatuador}
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
        <Form.Group controlId="formFecha">
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
            filterTime={filterWorksHours}
            minDate={new Date()}
            required
            className={error.fecha && 'is-invalid'}
          />
          {error.fecha && <div className='invalid-feedback'>{error.fecha}</div>}
        </Form.Group>
      )}

      {selectedDate && (
        <Form.Group controlId="formTipo">
          <Form.Label>Tipo de reserva:</Form.Label>
          <Form.Control
            as="select"
            value={tipo}
            onChange={handleTipoChange}
            required
            isInvalid={!!error.tipo}
          >
            <option value="">-- Por favor selecciona --</option>
            <option value="Valoración">Valoración</option>
            <option value="Tatuaje">Tatuaje</option>
            <option value="Curación">Curación</option>
          </Form.Control>
          <Form.Control.Feedback type='invalid'>{error.tipo}</Form.Control.Feedback>
        </Form.Group>
      )}
      <p
          style={{ cursor: "pointer"}}
          onClick={handleSubmit}
          > Crear Reserva </p>
    </Form>
  );
};

export default ReservaCard;
