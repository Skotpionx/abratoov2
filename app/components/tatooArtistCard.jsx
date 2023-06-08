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
                <Grid item>
                  <Image
                    src={src}
                    alt="Imagen de perfil"
                    width={100}   
                    height={100}  
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
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
