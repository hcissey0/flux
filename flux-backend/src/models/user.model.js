import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    primaryKey: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures unique usernames
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference the Post model
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', // Reference the Comment model
  }],
  savedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference the Post model
  }],
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
