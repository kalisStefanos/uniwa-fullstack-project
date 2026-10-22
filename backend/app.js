import express from 'express';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import buildingRoutes from './routes/buildingRoutes.js';
import apartmentRoutes from './routes/apartmentRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js';
import expenseCatRoutes from './routes/expenseCatRoutes.js';
import billRoutes from './routes/billRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

import cookieParser from 'cookie-parser';

import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:8000', 
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api', apartmentRoutes);
app.use('/api', expenseRoutes);
app.use('/api', expenseCatRoutes)
app.use('/api/bills', billRoutes);
app.use('/api', reportRoutes);

app.use(errorHandler);

export default app;
