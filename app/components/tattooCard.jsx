// components/TattooCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import '../styles/tattooCard.css'

const TattooCard = ({ imgSrc, theme, artist, price, description }) => (
  <Card sx={{ maxWidth: 345, boxShadow: "0px 0px 4px white" }} className="tattooCard">
    <a href={imgSrc} target="_blank" rel="noopener noreferrer">
      <CardMedia
        component="img"
        height="210"  
        image={imgSrc}
        alt="Tattoo"
      />
    </a>
    <CardContent className='cardContent'>
      <Typography variant="h5" component="div" sx={{ textShadow: "0px 0px 15px white" }}>
        Temática: {theme}
      </Typography>
      <Typography >
        Tatuador: {artist}
      </Typography>
      <Typography >
        Precio: {price}€
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default TattooCard;
