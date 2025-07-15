import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone_no: {
            type: String,
            required: false,
            match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
        },
        user_name: {
            type: String,
            required: true,
            unique: true
        },
        score: {
            type: Number,
            default: 0
        },
        rank: {
            type: Number,
            default: 0
        },
        levelReached: {
            type: Number,
            default: 0
        },
        currentStreak: {
            type: Number,
            default: 0
        },
        completedQuestions: {
            type: Map,
            of: [String], // e.g., "1" => ["q1", "q2"]
            default:{}
  }

    }, {
    timestamps: true //createdAt, updatedAt
}
);

export default mongoose.model("User", loginSchema);