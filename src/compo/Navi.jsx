import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Navi() {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand as={Link} to={'/'} className="fw-bold text-uppercase text-primary">
          Share For You
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={'/how_its_work'} className="nav-link-custom">
              How it works
            </Nav.Link>
            <Nav.Link as={Link} to={'/'} className="nav-link-custom">
             Start sharing
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
