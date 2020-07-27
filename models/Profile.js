import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({

    nickname:{
        type: String
    },
    profile_image:{
        type: String
    },
    reviews:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }



})