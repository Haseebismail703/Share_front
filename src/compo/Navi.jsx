import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navi() {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" data-bs-theme="dark" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand as={Link} to={'/'}>ShareForYou</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/about'} >How its work</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navi;
