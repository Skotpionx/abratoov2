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
              <Nav.Link href="/estudio"> 
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
            {!expanded && (
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
            )}
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
