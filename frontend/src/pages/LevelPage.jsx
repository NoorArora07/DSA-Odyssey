import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Badge, Modal, Button } from 'react-bootstrap';
import { getLevelQuestions } from '../services/api';
import axios from 'axios';

function LevelPage() {
  const { levelId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [lastClickedQuestion, setLastClickedQuestion] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await getLevelQuestions(levelId);
      setQuestions(res.data);
    }
    fetchQuestions();
  }, [levelId]);

  const handleQuestionClick = (qid) => {
    setLastClickedQuestion(qid);
    setTimeout(() => {
      setShowPopup(true);
    }, 3000);
  };

  const markAsDone = async (done) => {
    setShowPopup(false);
    if (done) {
      try {
        await axios.post('http://localhost:5000/api/complete', {
          levelId,
          questionId: lastClickedQuestion
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // Optional: refresh questions if needed
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Level {levelId} - Questions</h2>
      <ListGroup>
        {questions.map((q, index) => (
          <ListGroup.Item key={index}>
            <a
              href={q.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleQuestionClick(q.id)}
            >
              {q.title}
            </a>
            <Badge bg={q.completed ? "success" : "secondary"} className="float-end">
              {q.completed ? "Done" : "Pending"}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {showPopup && (
        <Modal show onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Did you complete this question?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={() => markAsDone(true)} className="me-2">Yes</Button>
            <Button onClick={() => markAsDone(false)} variant="secondary">No</Button>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
}

export default LevelPage;
