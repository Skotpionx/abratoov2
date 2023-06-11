'use client'
import React , {useState, useEffect} from 'react'
import ProfileCard from './profileCard';
import ViewReservaCard from './viewReservaCard';
import AdminPanel from './adminPanel';
import AdminPanelTatuadores from './adminPanelTatuadores';
import AdminPanelReservas from './adminPanelReservas';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Loading from './loading';
import '../styles/profileInfo.css'
import axios from 'axios';

const ProfileInfo = () => {
  const [activeLink, setActiveLink] = useState('perfil');
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, { withCredentials: true });
        setUserData(response.data)
        setIsLoading(false);
      } catch (error) {
        router.push('/auth');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (router.query.activeLink) {
      setActiveLink(router.query.activeLink);
    }
  }, [router.query.activeLink]);

  if (isLoading) {
      return (
          <>
              <Loading/>
          </>
      );
  }

    const handleLinkClick = (link) => {
      setActiveLink(link);
    };
    return (
        <div className='contenedorGlobal'>
        <div className='contenedorParcial'>
          <Box  p={2} className="boxContainer">
            <Typography variant="h6" component="div" align="center" mb={2} onClick={() => handleLinkClick('perfil')} style={{ cursor: 'pointer' }} className={activeLink === 'perfil' ? 'activeLink' : ''}>
              Mi Perfil
            </Typography>
            <Typography variant="h6" component="div" align="center" mb={2} onClick={() => handleLinkClick('reservas')} style={{ cursor: 'pointer' }} className={activeLink === 'reservas' ? 'activeLink' : ''}>
              Mis Reservas
            </Typography>
            {userData.admin && (
              <>
                <Typography variant="h6" component="div" align="center" mb={2} onClick={() => handleLinkClick('admin')} style={{ cursor: 'pointer' }} className={activeLink === 'admin' ? 'activeLink' : ''}>
                  Panel de Usuarios
                </Typography>
                <Typography variant="h6" component="div" align="center" mb={2} onClick={() => handleLinkClick('tatuadoresAdmin')} style={{ cursor: 'pointer' }} className={activeLink === 'tatuadoresAdmin' ? 'activeLink' : ''}>
                  Panel de Tatuadores
                </Typography>
                <Typography variant="h6" component="div" align="center" mb={2} onClick={() => handleLinkClick('tatuadoresReserva')} style={{ cursor: 'pointer' }} className={activeLink === 'tatuadoresReserva' ? 'activeLink' : ''}>
                  Panel de Reservas
                </Typography>
              </>
            )}

          </Box>
        </div>
  
        <div className="componenteContainer">
          {activeLink === 'perfil' && <ProfileCard userData={userData} setUserData={setUserData}  />}
          {activeLink === 'reservas' && <ViewReservaCard userData={userData} />}
          {activeLink === 'admin' && userData.admin && <AdminPanel userData={userData} />}
          {activeLink === 'tatuadoresAdmin' && userData.admin && <AdminPanelTatuadores userData={userData} />}
          {activeLink === 'tatuadoresReserva' && userData.admin && <AdminPanelReservas userData={userData} />}

        </div>

          <style jsx>{`
              @media (max-width: 600px) {
                div {
                  flex-direction: column;
                }
              }
            `}</style>
      </div>
    );
};

export default ProfileInfo;
