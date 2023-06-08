'use client'
import { Navbar, Nav , Container } from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/navBar.css'
import '../styles/font.css'
import  Image  from 'next/image'
import Link from 'next/link';

const NavBar = () => {
    return (
      <div className="navContainer">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="responsive-navbar-nav"  className="custom-toggler"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto center">
              <Nav.Link href="/estudio"> 
              {/* Span's para hacer la animación de recorrido*/}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Recepción </Nav.Link>
              <Nav.Link href="#tienda">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Ubicación </Nav.Link>
              <Nav.Link href="#citas"> 
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Citas </Nav.Link>
            </Nav>
              <div className="navbarImageContainer">
              <Link href="/">
                <Image
                  src="/soullogo.png"
                  className="navbar-image"
                  alt="Logo de la Empresa"
                  width={150}
                  height={150}
                  priority={true}
                />
              </Link>
              </div>
            <Nav className="ml-auto">
              <Nav.Link href="#sobreMi">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Sobre mí</Nav.Link>
              <Nav.Link href="#blog">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Blog</Nav.Link>
              <Nav.Link href="#contacto">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Contacto</Nav.Link>
              <Nav.Link href="/auth">
                <FontAwesomeIcon icon={faUser} className="svg-icon"/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };



export default NavBar;
