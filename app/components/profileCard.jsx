'use client'
import React , {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image'
import Loading from './loading';
import ProfileView from './profileView';
import '../styles/profileCard.css'
import '../styles/font.css'

const StyledCard = styled(Card)({
  borderRadius: '15px',
});

const StatContainer = styled(Grid)({
  backgroundColor: '#efefef',
  padding: '10px',
  borderRadius: '15px',
  marginBottom: '10px',
});

const StyledButton = styled(Button)({
  flexGrow: 1,
  margin: '0 5px',
});


const ProfileCard = ( {userData, setUserData }) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [ageError, setAgeError] = useState('');
const [passwordError, setPasswordError] = useState('');

const validateAge = (value) => {
  if (value < 15) {
    setAgeError('La edad debe ser mayor o igual a 15');
    return false;
  } else {
    setAgeError('');
    return true;
  }
};

const validatePasswords = (currentPassword, newPassword) => {
  if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
    setPasswordError('Debe proporcionar ambas contraseñas o ninguna');
    return false;
  } else {
    setPasswordError('');
    return true;
  }
};

  useEffect(() => {
    if(userData) {
      setLoading(false);
    }
  }, [userData]);

  if(loading ) {
        return <> <Loading/> </>
  }
  const imageUrl = userData.imagenes[0];
  const handleUpdateClick = async () => {
    try{
      const isAgeValid = validateAge(updatedData.edad);
      const arePasswordsValid = validatePasswords(updatedData.passwordActual, updatedData.passwordNueva);
      if(isAgeValid && arePasswordsValid){
        //Con este response luego actualizamos los datos del formulario con response.data setUserData(response.data);
        const response= await axios.put(`${API_URL}/users/updateProfile/`, updatedData, { withCredentials: true});
        //Establecemos en el formulario los nuevos datos. password no viene asi que no rayarse, no se pone en undefined :S , todo calculado
        setUserData(response.data);
        //setEditMode a false para mostrar los nuevos datos actualizados. 
        setEditMode(false);
      }
    }catch (error){
      if (error.response && error.response.status === 403) {
        setPasswordError('Contraseña Actual Incorrecta');
      }
    }
  };

  const handleEditClick = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  }


  const handleLogoutClick = async() => {
    try{
      const response = await axios.post(`${API_URL}/auth/logout`, null, {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      if(response.status === 200){
          router.push('/')
      }
    }catch (error ){
      console.error(error);
    }
  }



  return (
    <div className="vh-100 w-100 containerGrid" >
      <Grid container justifyContent="center" >
        <Grid item md={12} lg={7} xl={8} className="gridCardContainer">
          <StyledCard>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item>
                  <Image
                    src={imageUrl}
                    alt="Imagen de perfil"
                    width={200}   
                    height={200}  
                    style={{ objectFit:'cover'}}
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs className="inputContainer">
                      {editMode ? (
                        <> 
                        <TextField
                          label="Nombre"
                          defaultValue={userData.nombre}
                          onChange={(e) => setUpdatedData({ ...updatedData, nombre: e.target.value })}
                        />
                        <TextField
                          label="Pseudonimo"
                          defaultValue={userData.pseudonimo}
                          onChange={(e) => setUpdatedData({ ...updatedData, pseudonimo: e.target.value })}
                        />
                        </>
                      ): (
                        <> 
                            <Typography variant="h5" component="div">
                            { userData.nombre ? userData.nombre : ''}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                        { userData.pseudonimo ? userData.pseudonimo : ''}
                      </Typography>
                        </>
                      )}
                      

                      <StatContainer container >
                      {editMode ? (
                        <form noValidate autoComplete="off"> 
                        <TextField
                          label="Email"
                          defaultValue={userData.email}
                          onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                          style={{margin:'1%'}}
                        />
                        <TextField
                          label="Edad"
                          defaultValue={userData.edad}
                          onChange={(e) => setUpdatedData({ ...updatedData, edad: e.target.value })}
                          error={Boolean(ageError)}
                          helperText={ageError}
                          onBlur={(e) => validateAge(e.target.value)}
                          style={{margin:'1%'}}
                        />
                        <TextField
                          label="Dirección"
                          defaultValue={userData.direccion}
                          onChange={(e) => setUpdatedData({ ...updatedData, direccion: e.target.value })}
                          style={{margin:'1%'}}
                        />
                        <TextField
                          label="Teléfono"
                          defaultValue={userData.telefono}
                          onChange={(e) => setUpdatedData({ ...updatedData, telefono: e.target.value })}
                          style={{margin:'1%'}}
                        />
                        <TextField
                          label="Contraseña Actual"
                          type="password"
                          defaultValue=''
                          autoComplete="current-password" 
                          error={Boolean(passwordError)}
                          helperText={passwordError}
                          onChange={(e) => setUpdatedData({ ...updatedData, passwordActual: e.target.value })}
                          style={{margin:'1%'}}
                        />
                        <TextField
                          label="Contraseña Nueva"
                          type="password"
                          defaultValue=''
                          autoComplete="new-password"
                          onChange={(e) => setUpdatedData({ ...updatedData, passwordNueva: e.target.value })}
                          onBlur={(e) => validatePasswords(updatedData.passwordActual, e.target.value)}
                          style={{margin:'1%'}}
                        />
                        </form>
                      ): (
                          <ProfileView userData={userData} />
                        )
                    }
                      </StatContainer>
                    </Grid>
                    <Grid item>
                      <StyledButton variant="outlined" onClick={handleEditClick}> Editar </StyledButton>
                      { editMode  && <StyledButton variant="contained" color="primary" onClick={handleUpdateClick}> Actualizar </StyledButton> }
                      <StyledButton variant="outlined" onClick={handleLogoutClick}> Cerrar sesión </StyledButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileCard;
