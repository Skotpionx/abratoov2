
import {  Typography, Grid} from '@mui/material';

const ProfileView = ( { userData}) => {
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
                        </>
    )
}

export default ProfileView
