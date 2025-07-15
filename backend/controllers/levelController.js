import { request, response } from 'express';
import dotenv from 'dotenv';
import User from '../models/users.model.js';
import { levelQuestions } from '../utils/levelQuestions.js';
dotenv.config();

export const getLevelQuestions = async (req, res) => {
  try {
    // console.log("Inside getLevelQuestions");  // <- check if printed
    // console.log("req.user:", req.user)

    const { id: levelId } = req.params;
    const email = req.user.email;

    const user = await User.findOne({ email });
    const completed = user.completedQuestions.get(levelId) || [];

    const questions = levelQuestions[levelId];
    if (!questions) return res.status(404).json({ error: 'Invalid level ID' });

    // console.log("levelId:", levelId);
    // console.log("email:", email);
    // console.log("user:", user);
    // console.log("questions:", levelQuestions[levelId]);

    const enhanced = questions.map(q => ({
      ...q,
      completed: completed.includes(q.id)
    }));

    res.status(200).json(enhanced);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get questions' });
  }
};
