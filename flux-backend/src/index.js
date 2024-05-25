require('dotenv').config();
require('./utils/db');
import express from 'express';
import userRouter from './routes/user.routes';
import chatRouter from './routes/chat.routes';
import messageRouter from './routes/message.routes';
import postRouter from './routes/post.routes';
import commentRouter from './routes/comment.routes';
import { apiErrorHandler } from './utils/handlers';
import authRouter from './routes/auth.routes';

const app = express();
app.use(express.json());

// The auth routes
app.use('/api/auth', authRouter);

// The user routes
app.use('/api/users', userRouter);

// The post routes
app.use('/api/posts', postRouter);

// The comment routes
app.use('/api/comments', commentRouter);

// The chat routes
app.use('/api/chats', chatRouter);

// The message routes
app.use('/api/messages', messageRouter);

// The error handler
app.use(apiErrorHandler);

const port = process.env.PORT || 4;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
