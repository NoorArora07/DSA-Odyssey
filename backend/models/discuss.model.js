import mongoose from "mongoose";

const discussSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        
        user_name:{
            type:String,
            required:true,
        },
        
        message:{
            type:String,
            required:true
        },

        createdAt: {
            type: Date,
            default: Date.now  
  }

    }, 
);

export default mongoose.model("Discuss", discussSchema);