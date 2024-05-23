import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
      },
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    chatType: {
        type: String,
        required: true,
        enum: ['single-chat', 'group-chat']
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
