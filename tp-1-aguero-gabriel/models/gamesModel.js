import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    genre:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    developer:{
        type: String,
        required: true
    },
    release_date:{
        type: Date,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
    cover:{
        type: String,
        required: true
    }
});

export default mongoose.model("games", gameSchema);