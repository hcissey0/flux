require('dotenv').config();
require('./utils/db');
import express from 'express';
import userRouter from './routes/user.routes';
import chatRouter from './routes/chat.routes';
import messageRouter from './routes/message.routes';
import postRouter from './routes/post.routes';
import commentRouter from './routes/comment.routes';
import { errorHandler, apiErrorHandler } from './utils/handlers';

const app = express();
app.use(express.json());

// The user routes
app.use('/users', userRouter);

// The post routes
app.use('/posts', postRouter);

// The comment routes
app.use('/comments', commentRouter);

// The chat routes
app.use('/chats', chatRouter);

// The message routes
app.use('/messages', messageRouter);


// The error handler
app.use(apiErrorHandler);

const port = process.env.PORT || 4;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
