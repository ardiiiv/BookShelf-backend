import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Email tidak valid"]
    },
    password: {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);