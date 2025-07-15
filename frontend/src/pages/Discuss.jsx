import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { getDiscussions, postDiscussion } from '../services/api';

function Discuss() {
  const [message, setMessage] = useState('');
  const [discussion, setDiscussion] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await postDiscussion({ content: message });
    setMessage('');
    fetchDiscussion();
  };

  const fetchDiscussion = async () => {
    const res = await getDiscussions();
    setDiscussion(res.data);
  };

  useEffect(() => {
    fetchDiscussion();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Discuss with Others</h2>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask or share..." />
        <Button variant="primary" className="mt-2" type="submit">Post</Button>
      </Form>

      <ListGroup>
        {discussion.map((msg, index) => (
          <ListGroup.Item key={index}>
            <strong>{msg.user}:</strong> {msg.content}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Discuss;