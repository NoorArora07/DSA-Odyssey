import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        user_name:{
            type:String,
            required:true,
        },
        score: {
            type: Number,
            required: true
        },
        rank:{
            type:Number,
            required:true
        },

    }, {
        timestamps: true //createdAt, updatedAt
    }
);

export default mongoose.model("LeaderBoard", leaderboardSchema);