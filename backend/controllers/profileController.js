import { request, response } from 'express';
import dotenv from 'dotenv';
import User from '../models/users.model.js';
import Discuss from "../models/discuss.model.js";
import LeaderBoard from "../models/leaderboard.model.js";
dotenv.config();

export const viewProfile = async (request, response) => {

    const userEmail = request.user.email;
    try {
        const findDetails = await User.findOne({ email: userEmail });
        const data = {
            name: request.user.name,
            email: request.user.email,
            phone_no: findDetails.phone_no,
            user_name: findDetails.user_name
        }
        console.log("user details successfully fetched");
        response.status(200).send(data);
    } catch (error) {
        console.log("there has been an error while viewing the profile: ", error);
        response.status(500).send(error);
    }
}

// export const editProfile = async (req, res) => {
//     const userEmail = req.user.email; // using token email
//     const updates = req.body;

//   try {
//     // 1. Check if user exists
//     const user = await User.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 2. Loop through update keys
//     for (const key in updates) {
//       if (updates.hasOwnProperty(key)) {
//         const newValue = updates[key];

//         // Update in User collection
//         const result = await User.updateOne(
//           { email: userEmail },
//           { $set: { [key]: newValue } }
//         );

//         if (result.modifiedCount > 0) {
//           console.log(`User updated: ${key} -> ${newValue}`);
//         } else {
//           console.log(`No change for ${key}`);
//         }

//         // Sync in Discuss and LeaderBoard if applicable
//         if (key === "user_name") {
//           const discussExists = await Discuss.exists({ email: userEmail });
//           const lbExists = await LeaderBoard.exists({ email: userEmail });

//           if (discussExists) {
//             await Discuss.updateMany(
//               { email: userEmail },
//               { $set: { user_name: newValue } }
//             );
//             console.log("Discuss user_name updated");
//           }

//           if (lbExists) {
//             await LeaderBoard.updateMany(
//               { email: userEmail },
//               { $set: { user_name: newValue } }
//             );
//             console.log("LeaderBoard user_name updated");
//           }
//         }

//         if (key === "email") {
//           const discussExists = await Discuss.exists({ email: userEmail });
//           const lbExists = await LeaderBoard.exists({ email: userEmail });

//           if (discussExists) {
//             await Discuss.updateMany(
//               { email: userEmail },
//               { $set: { email: newValue } }
//             );
//             console.log("Discuss email updated");
//           }

//           if (lbExists) {
//             await LeaderBoard.updateMany(
//               { email: userEmail },
//               { $set: { email: newValue } }
//             );
//             console.log("LeaderBoard email updated");
//           }

//           // NOTE: Even if DB email is updated, token still holds OLD email.
//           // So user will need to log in again to get a token with updated email. 
//         }
//       }
//     }

//     res.status(200).json({ message: "Profile updated successfully." });

//   } catch (error) {
//     console.error("Error while updating profile:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };