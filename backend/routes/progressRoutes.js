import express from 'express';
import {getLevel, getStreak, markQuestionComplete } from '../controllers/progressController.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/complete', verifyToken, markQuestionComplete);
router.get('/getLevel', verifyToken, getLevel);
router.get('/streak', verifyToken, getStreak);

export default router;
