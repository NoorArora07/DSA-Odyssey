import { request, response } from 'express';
import dotenv from 'dotenv';
import LeaderBoard from '../models/leaderboard.model.js';
import User from '../models/users.model.js';
dotenv.config();

export const viewLeader_board = async (request, response) => {

    const userEmail = request.user.email;
    try {
        // Fetch all users sorted by score descending
        const allUsers = await User.find().sort({ score: -1 });

        // Assign ranks dynamically
        const leaderboard = allUsers.map((user, index) => ({
            email: user.email,
            user_name: user.user_name,
            score: user.score,
            rank: index + 1
        }));

        // Step 3: Find current user's entry
        const currentUserEntry = leaderboard.find(user => user.email === userEmail);

        if (!currentUserEntry) {
            return res.status(404).json({ message: "User not found in leaderboard." });
        }

        // Return the current user's details + full leaderboard 
        res.status(200).json({
            user: currentUserEntry,
            leaderboard: leaderboard
        });

    } catch (error) {
        console.log("There has been an error while viewing the leaderboard: ", error);
        response.status(500).send(error);
    }
}