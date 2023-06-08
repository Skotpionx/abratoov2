import axios from 'axios';
import TatooArtistCard from './tatooArtistCard';
import ReservaCard from './reservaCard';
import { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

const ReservaContainer = () => {
  const [tatuadores, setTatuadores] = useState([]);
  const [showTatuadores, setShowTatuadores] = useState(false);
  const [showReservaCard, setShowReservaCard] = useState(false);

  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop){
        setShowTatuadores(true);
      } else {
        if (st === 0) { // Si hemos llegado a la parte superior de la página
          setShowTatuadores(false);
          setShowReservaCard(false);

        }
      }
      lastScrollTop = st <= 0 ? 0 : st; // Para móviles o arriba
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchTatuadores = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${API_URL}/users/tatuadores`, { withCredentials: true });
        if (response.status === 200) {
          setTatuadores(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTatuadores();
  }, []);

  const handleButtonClick = () => {
    setShowTatuadores(!showTatuadores);
    setShowReservaCard(false);
  };
  const handleButtonClickReserva = () =>{
    setShowReservaCard(!showReservaCard);
  }

  const transitions = useTransition(showTatuadores, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    config: { duration: 500 }, 
  });

  const reservaCardTransitions = useTransition(showReservaCard, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });

  return (
    <div>
      <h1 className='textShadowWhite boxShadow interestedContainer'>
      ¿INTERESADO? 
        <span className='promociones interested' onClick={handleButtonClick}>
        RESERVA YA!
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </h1>
      <div className='tattooContainer'>
        {transitions((style, item) =>
          item &&
          <animated.div style={style} className="todosTatuadoresContainer">
            {tatuadores.map(tatuador => (
              <TatooArtistCard
                key={tatuador.idTatuador}
                src={tatuador.imagenes[0]}
                name={tatuador.nombre}
                alias={tatuador.pseudonimo}
                experiencia={tatuador.experiencia}
              />
            ))}
                <animated.div className="reservaInterested"> 
              <p
                className="reservaButton boxShadow "
                onClick={handleButtonClickReserva}
                > Click aquí para rellenar los datos de tu reserva
              </p>    
              </animated.div>
          </animated.div>
        )}
         {reservaCardTransitions((style, item) =>
          item && <animated.div style={style}><ReservaCard tatuadores={tatuadores}/></animated.div>
        )}
      </div>

    </div>
  );
};

export default ReservaContainer;
