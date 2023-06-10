import React from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Image from 'next/image'
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
    borderRadius: '15px',
  });
  
const TatooArtistCard = ( { src, name, alias, experiencia, ubicacion }) => {
    return (
        <Grid container justifyContent="center">
        <Grid item  xs={12} md={12} lg={6}>
          <StyledCard>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item className="image-container-perfil" >
                  <Image
                    src={src || '/minion.png'}
                    alt="Imagen de perfil"
                    width={150}   
                    height={150}  
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs className="info-tatto-container">
                        <Typography
                          variant="h5" 
                          component="div"
                        >  {name} </Typography>
                      <Typography variant="body" color="textSecondary">
                      {alias}
                      </Typography>
                        <Typography variant="body" color="textSecondary" component="div">
                            {experiencia} año/s de experiencia
                        </Typography>
                        <Typography variant="body" color="textSecondary">
                            {ubicacion}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    )
}

export default TatooArtistCard
