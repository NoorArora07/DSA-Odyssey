import express from 'express';
import { viewProfile } from '../controllers/profileController.js';
//import { editProfile } from '../controllers/profileController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { viewLeader_board } from '../controllers/profileController.js';

const router = express.Router();

router.get("/", verifyToken, viewProfile);
//router.patch("/edit", verifyToken, editProfile);
router.get("/leaderBoard", verifyToken, viewLeader_board);

export default router

