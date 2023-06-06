'use client'
import React , {useState, useEffect} from 'react'
import ProfileCard from './profileCard';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Loading from './loading';
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
    // Si el usuario está logueado, muestra la información del perfil
    return (
        <div style={{ display: 'flex', width: '80%', margin: '0 auto' }}>
        <div style={{ flex: '30%' , justifyContent:'right', display:'flex'}}>
          <Box display="flex" flexDirection="column" alignItems="center" bgcolor="#ffffff" p={2} borderRadius="15px"  maxHeight="340px" justifyContent="space-evenly" >
            <Typography variant="h6" component="div" align="center" mb={2} onClick={() => handleLinkClick('perfil')} style={{ cursor: 'pointer' }}>
              Mi Perfil
            </Typography>
            <Typography variant="h6" component="div" align="center" mb={2} onClick={() => handleLinkClick('reservas')} style={{ cursor: 'pointer' }}>
              Mis Reservas
            </Typography>
            <Typography variant="h6" component="div" align="center" onClick={() => handleLinkClick('sesion')} style={{ cursor: 'pointer' }}>
              Sesión
            </Typography>
            <Typography variant="h6" component="div" align="center" onClick={() => handleLinkClick('posts')} style={{ cursor: 'pointer' }}>
              Posts
            </Typography>
            <Typography variant="h6" component="div" align="center" onClick={() => handleLinkClick('tatuador')} style={{ cursor: 'pointer' }}>
              Mis Datos (Tatuador)
            </Typography>
          </Box>
        </div>
  
        <div style={{ flex: '70%' }}>
          {activeLink === 'perfil' && <ProfileCard userData={userData}  />}
          {/* {activeLink === 'reservas' && <ProfileCard />}
          {activeLink === 'sesion' && <ProfileCard />}
          {activeLink === 'posts' && <ProfileCard />}
          {activeLink === 'tatuador' && <ProfileCard />} */}
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
