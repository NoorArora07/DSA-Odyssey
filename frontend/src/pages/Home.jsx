import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to DSA Odyssey</h1>
      <p>Gamify your DSA Journey!</p>
      <Link to="/login">
        <Button variant="success" className="me-2">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="outline-primary">Register</Button>
      </Link>
    </Container>
  );
}

export default Home;
