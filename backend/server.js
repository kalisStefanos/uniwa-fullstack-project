import express from 'express';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import buildingRoutes from './routes/buildingRoutes.js';
import apartmentRoutes from './routes/apartmentRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js';
import cookieParser from 'cookie-parser';
import billRoutes from './routes/billRoutes.js'

import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT = 9000 || 9090;

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
app.use('/api/buildings/:id/expenses', expenseRoutes);
app.use('/api/bills', billRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Express is running on port ${port}`)); // port and callback function