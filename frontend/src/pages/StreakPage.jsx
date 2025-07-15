import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { getStreak } from '../services/api';

function StreakPage() {
  const [streak, setStreak] = useState({ current: 0, best: 0 });

  useEffect(() => {
    async function fetchStreak() {
      const res = await getStreak();
      setStreak(res.data);
    }
    fetchStreak();
  }, []);

  return (
    <Container className="mt-4">
      <Card className="text-center">
        <Card.Body>
          <h3>🔥 Current Streak: {streak.current} days</h3>
          <h5>🏆 Best Streak: {streak.best} days</h5>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StreakPage;
