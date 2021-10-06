import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'

import profile from './pages/profile';
import login from './pages/login';
import signup from './pages/signup';
import clients from './pages/clients';
import addClient from './pages/addClient';
import editClient from './pages/editClient';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Container fluid>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Your Health ... </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
              <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
              {/* <Nav.Link as={Link} to="/addClient">Add new client</Nav.Link>
              <Nav.Link as={Link} to="/editClient">View client</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Switch>
            <Route exact path="/" component={login} />
            <Route exact path="/login" component={login} />
            <Route exact path="/profile" component={profile} />
            <Route exact path="/clients" component={clients} />
            <Route exact path="/addClient" component={addClient} />
            <Route exact path="/Client/:id" component={editClient} />
            {/* <Route exact path="/logout" component={logout} /> */}
            <Route exact path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>        
    </Container>
  );
}

export default App;