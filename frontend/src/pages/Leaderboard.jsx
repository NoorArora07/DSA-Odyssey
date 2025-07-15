import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getLeaderboard } from '../services/api';

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await getLeaderboard();
      setData(res.data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Leaderboard</h2>
      <Table striped bordered>
        <thead>
          <tr><th>Rank</th><th>Name</th><th>Score</th></tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Leaderboard;