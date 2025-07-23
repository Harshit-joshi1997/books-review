import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: process.env.CORS_CREDENTIALS === 'true'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

import userRoutes from './routes/user.routes.js';
import bookRoutes from './routes/book.routes.js';
import reviewRoutes from './routes/review.routes.js';

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/reviews', reviewRoutes);



export { app };
