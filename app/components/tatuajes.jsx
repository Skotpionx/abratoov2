// pages/Tattoos.js
import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import TattooCard from '../components/tattooCard';

const Tatuajes = () => {
  const tattooData = [
    { imgSrc: "/luffy.jfif", theme: "Anime", artist: "Juanmi", price: 15, description: "Luffy, el protagonista de One Piece" },
    { imgSrc: "/heisenberg.jpg", theme: "Series", artist: "Abraham", price: 150, description: "Semi-realista de Walter White" },
    { imgSrc: "/anubis.jfif", theme: "Dioses", artist: "Abraham", price: 200, description: "Semirealista de Anubis e Illuminati en brazo" },
    { imgSrc: "/coloreado.jpg", theme: "ReColoración", artist: "Abraham", price: 60, description: "Recoloración de planta" },
    { imgSrc: "/ironman.jpg", theme: "Superhéroes", artist: "Abraham", price: 20, description: "IronMan con técnica lineal" },
    { imgSrc: "/geometrica.jpg", theme: "Geométrica", artist: "Juanmi", price: 200, description: "Técnica geométrica en muslo" },
  ];

  return (
    <Box sx={{ p: '2%' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {tattooData.map((tattoo, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TattooCard {...tattoo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tatuajes;
