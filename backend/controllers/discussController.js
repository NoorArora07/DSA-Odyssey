import {request, response} from 'express';
import dotenv from 'dotenv';
import Discuss from "../models/discuss.model.js";
import User from '../models/users.model.js';
dotenv.config();

export const addDiscussion = async (req, res) => {
  try {
    const email = req.user.email;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get user details
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newMessage = new Discuss({
      email: user.email,
      user_name: user.user_name,
      message
    });

    await newMessage.save();

    res.status(201).json({ message: "Discussion posted successfully", data: newMessage });
  } catch (error) {
    console.error("Error posting discussion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewDiscussion = async (req, res) => {
  try {
    const allMessages = await Discuss.find().sort({ createdAt: -1 });

    res.status(200).json({ discussions: allMessages });
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ error: "Failed to fetch discussion data" });
  }
};

