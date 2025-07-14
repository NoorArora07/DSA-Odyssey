import express from 'express';
import { viewLeader_board } from '../controllers/leaderboardController.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get("/", verifyToken, viewLeader_board);

export default router

