const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;

// User Schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: ObjectId, ref: 'Post' }],
  comments: [{ type: ObjectId, ref: 'Comment' }],
  likedPosts: [{ type: ObjectId, ref: 'Post' }],
  likedComments: [{ type: ObjectId, ref: 'Comment' }],
  savedPosts: [{ type: ObjectId, ref: 'Post' }],
}, { timestamps: true }); // Add createdAt and updatedAt automatically

const User = mongoose.model('User', userSchema);

// Post Schema
const postSchema = new Schema({
  author: { type: ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  likes: [{ type: ObjectId, ref: 'User' }],
  saves: [{ type: ObjectId, ref: 'User' }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// Comment Schema
const commentSchema = new Schema({
  author: { type: ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  likes: [{ type: ObjectId, ref: 'User' }],
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

// module.exports = { User, Post, Comment };


export {
    User,
    Post,
    Comment,
};
