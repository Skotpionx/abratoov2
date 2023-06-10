
import {  Typography, Grid} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileView = ( { userData}) => {
    const [tatuadorData, setTatuadorData] = useState(null);
    useEffect( () => {
      const fetchTatuadorData = async() => {
        if(userData.esTatuador){
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            try{
              const response = await axios.get(`${API_URL}/users/getTatuadorInfo`, { withCredentials: true });
              setTatuadorData(response.data);
            }catch(error){
              console.error(error);
            }
        }
      };
      fetchTatuadorData();
    }, [userData])
    return (
<> 
                          <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">Email</Typography>
                          <Typography variant="body2">   { userData.email ? userData.email : ''} </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">Edad </Typography>
                          <Typography variant="body2">{ userData.edad ? userData.edad : ''}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">DNI</Typography>
                          <Typography variant="body2"> { userData.dni ? userData.dni : '' }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">Dirección</Typography>
                          <Typography variant="body2">   { userData.direccion ? userData.direccion : ''} </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary"> Teléfono </Typography>
                          <Typography variant="body2">{ userData.telefono ? userData.telefono : ''}</Typography>
                        </Grid>
                        {tatuadorData && userData.esTatuador && (
                          <>
                            <Grid item xs={12}>
                              <Typography variant="body2" color="textSecondary">
                                Valoración Media
                              </Typography>
                              <Typography variant="body2">{tatuadorData.valoracionMedia ? tatuadorData.valoracionMedia : ''}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2" color="textSecondary">
                                Experiencia
                              </Typography>
                              <Typography variant="body2">{tatuadorData.experiencia ? tatuadorData.experiencia : ''}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2" color="textSecondary">
                                Ubicación
                              </Typography>
                              <Typography variant="body2">{tatuadorData.ubicacion ? tatuadorData.ubicacion : ''}</Typography>
                            </Grid>
                          </>
                        )}
                        </>
    )
}

export default ProfileView
