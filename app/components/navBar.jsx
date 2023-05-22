'use client'
import { Navbar, Nav , Container } from 'react-bootstrap';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navBar.css';
import '../styles/font.css'
import  Image  from 'next/image'

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleNavbar = () => {
      setExpanded((prevState) => !prevState);
    };
  
    const handleNavbarClose = () => {
      setExpanded(false);
    };
  
    return (
      <div className="navContainer">
        <Navbar expand="sm" expanded={expanded} onToggle={toggleNavbar}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#servicios">Servicios</Nav.Link>
              <Nav.Link href="#tienda">Tienda</Nav.Link>
              <Nav.Link href="#citas">Citas</Nav.Link>
            </Nav>
            {!expanded && (
              <div className="navbarImageContainer">
                <Image
                  src="/soullogo.png"
                  className="navbar-image"
                  alt="Logo de la Empresa"
                  width={150}
                  height={150}
                  priority={true}
                />
              </div>
            )}
            <Nav className="ml-auto">
              <Nav.Link href="#sobreMi">Sobre mí</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
              <Nav.Link href="/auth">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {expanded && <div className="navbarBackdrop" onClick={handleNavbarClose} />}
      </div>
    );
  };






export default NavBar;
