import express from 'express';
import { getLevelQuestions } from '../controllers/levelController.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get('/:id', verifyToken, getLevelQuestions);

export default router