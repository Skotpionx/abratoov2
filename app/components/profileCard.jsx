'use client'
import React , {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image'
import Loading from './loading';
import ProfileView from './profileView';

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

const DeleteButton = styled(Button)({
  flexGrow: 1,
  margin: '0 5px',
  backgroundColor: 'red',
  '&:hover': {
    backgroundColor: 'darkred',
  },
})

const ProfileCard = ( {userData, setUserData}) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});


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
      //Con este response luego actualizamos los datos del formulario con response.data setUserData(response.data);
        const response= await axios.put(`${API_URL}/users/updateProfile/`, updatedData, { withCredentials: true});
        //Establecemos en el formulario los nuevos datos. password no viene asi que no rayarse, no se pone en undefined :S , todo calculado
        setUserData(response.data);
        //setEditMode a false para mostrar los nuevos datos actualizados. 
        setEditMode(false);
    }catch (error){
      console.error(error);
    }
  };
  const handleDeleteClick = async () => {
    setDeleteMode((prevDeleteMode) => !prevDeleteMode);
  };

  const handleEditClick = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  }

  const handleCrearTatuador = async ()  =>{
    try{
      //NO HACEMOS VERIFICACIÓN DE SI YA ES TATUADOR MAS QUE NO MOSTRAR EL BOTÓN, DEBIDO A QUE ESE USERID ES UNA REFERENCIA Y MONGO NO DEJA CREAR MÁS DE UNO.
      // ESE ERROR NOS LO AHORRAMOS (LO GESTIONA MONGO)
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const tatuadorData = {
            "valoracionMedia": 0,
            "experiencia": 0,
            "ubicacion": "",
      };
      const response = await axios.post(`${API_URL}/users/tatuadores`, tatuadorData, { withCredentials: true})
      if(response.status === 201){
        const userUpdateData = {
          "esTatuador": true,
        }
        const responseUser = await axios.put(`${API_URL}/admin/users/${userData._id}`, userUpdateData, { withCredentials: true})
      }
  }catch(error){
      console.error(error)
    }
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
    <div className="vh-100 w-100" style={{ backgroundColor: '#C5DBF5', display:'flex', overflow:'auto'  }}>
      <Grid container justifyContent="center">
        <Grid item md={12} lg={7} xl={8}>
          <StyledCard>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item>
                  <Image
                    src={imageUrl}
                    alt="Imagen de perfil"
                    width={200}   
                    height={200}  
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
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
                          onChange={(e) => setUpdatedData({ ...updatedData, passwordActual: e.target.value })}
                          style={{margin:'1%'}}
                        />
                        <TextField
                          label="Contraseña Nueva"
                          type="password"
                          defaultValue=''
                          autoComplete="new-password"
                          onChange={(e) => setUpdatedData({ ...updatedData, passwordNueva: e.target.value })}
                          style={{margin:'1%'}}
                        />
                        </form>
                      ): (
                        deleteMode ? (
                          <TextField
                          label="ESCRIBE 'ESTOY SEGURO' PARA ELIMINAR DEFINITIVAMENTE TU CUENTA (ESTO NO TIENE VUELTA ATRÁS)"
                          defaultValue={''}
                          /> 
                        ) : (
                          <ProfileView userData={userData} />
                        )
                      )
                    }
                      </StatContainer>
                    </Grid>
                    <Grid item>
                      <StyledButton variant="outlined" onClick={handleEditClick}> Editar </StyledButton>
                      { editMode  && <StyledButton variant="contained" color="primary" onClick={handleUpdateClick}> Actualizar </StyledButton> }
                      { !editMode && !deleteMode && <DeleteButton variant="contained" color="secondary" onClick={handleDeleteClick}> Borrar Cuenta! </DeleteButton> }
                      <StyledButton variant="outlined" onClick={handleLogoutClick}> Cerrar sesión </StyledButton>
                      <StyledButton variant="outlined" onClick={handleCrearTatuador}> Crear tatuador </StyledButton>
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
