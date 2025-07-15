import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ProgressBar, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getLevel, getStreak } from '../services/api.js'; 

function Dashboard() {
  const [levelInfo, setLevelInfo] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const levelRes = await getLevel();
        const streakRes = await getStreak();

        setLevelInfo(levelRes.data);
        setStreak(streakRes.data.streak);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch level or streak');
        setLoading(false);
        console.error(err);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading Dashboard...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your DSA Odyssey</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Level: {levelInfo.level}</Card.Title>
              <Card.Text>Score: {levelInfo.score}</Card.Text>
              <ProgressBar now={levelInfo.progress} label={`${levelInfo.progress}%`} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>🔥 Current Streak</Card.Title>
              <Card.Text>{streak} days</Card.Text>
              <Button variant="outline-success" disabled>Keep Going!</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
