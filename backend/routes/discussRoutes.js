import express from 'express';
import { viewDiscussion } from '../controllers/discussController.js';
import { addDiscussion } from '../controllers/discussController.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get("/", verifyToken, viewDiscussion);
router.post("/add", verifyToken, addDiscussion);

export default router

