import { request, response } from 'express';
import dotenv from 'dotenv';
import User from '../models/users.model.js';
dotenv.config();

export const markQuestionComplete = async (req, res) => {
  const { levelId, questionId } = req.body;
  const email = req.user.email;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const current = user.completedQuestions.get(levelId) || [];
    if (!current.includes(questionId)) {
      current.push(questionId);
      user.completedQuestions.set(levelId, current);
      user.score += 100; 
     // user.levelReached = Math.max(user.levelReached, parseInt(levelId));
      user.levelReached = Math.floor(score / 600) + 1
      await user.save();
    }

    res.status(200).json({ message: 'Question marked complete' });
  } catch (err) {
    console.error('Error completing question:', err);
    res.status(500).json({ error: 'Failed to mark question as completed' });
  }
};


export const getLevel = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const level = user.levelReached || 0;

    return res.status(200).json({ levelReached : level });
  } catch (error) {
    console.error("Error fetching level:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getStreak = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const streak = user.currentStreak || 0;

    return res.status(200).json({ currentStreak: streak });
  } catch (error) {
    console.error("Error fetching streak:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
