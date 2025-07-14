import {request, response} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../middleware/verifyToken.js';

dotenv.config();

//const JWT_SECRET = process.env.JWT_SECRET;

export const signup =  async (request, response) => {
    console.log("Request Body:", request.body);

    try {
        const existingUserName = await User.findOne({user_name: request.body.user_name});
        if (existingUserName) {
            console.log("A User with this username already exists!");
            return response.status(400).send("A User with this username already exists!");
        }

        const existingUser = await User.findOne({ email: request.body.email });
        if (existingUser) {
            console.log("Cannot use the same email more than once!");
            return response.status(400).send("This email is already in use!");
        }

        //const data = new User(request.body);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const data = new User({
            name: request.body.name,
            email : request.body.email, 
            password: hashedPassword,
            phone_no:request.body.phone_no,
            user_name : request.body.user_name,
        });
        const result = await data.save();
        
        const token = jwt.sign({ 
            name: data.name,
            email: data.email,
            user_name : request.body.user_name,
            
         }, JWT_SECRET, { expiresIn: "2h",}
        );

        console.log("Successful signup!");
        response.status(200).json({ message: "Signup Successful!", 
            token: token});
    } catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }
};

export const login = async (request, response) => {
    try {
        const existingUser = await User.findOne({email : request.body.email });
        if  (!existingUser) {
            console.log("No such User on platform! You should sign up");
            return response.status(400).send("No such User on platform! You should sign up");
        }

        const isValidPassword = await bcrypt.compare(request.body.password, existingUser.password);

        if (!isValidPassword) {
            console.log("Incorrect password!");
            return response.status(400).send("Incorrect password!");
        }

        const token = jwt.sign({ 
            name: existingUser.name,
            user_name: existingUser.user_name, 
            email: existingUser.email,
         }, JWT_SECRET, { expiresIn: "2h",}
        );

        console.log("Successful login!");
        response.status(200).json({ message: "Login successful!", token: token});
    }
     catch (error) {
        console.error("Error during login:", error);
        response.status(500).send("An error occurred during login.");
    }
};
