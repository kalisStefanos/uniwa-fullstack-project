import express from 'express';
import auth from './routes/auth.js';
import buildings from './routes/buildings.js';
import apartments from './routes/apartments.js'
import expenses from './routes/expenses.js';
import expenseReports from './routes/expenseReports.js';
import expenseCats from './routes/expenseCats.js';

import cors from 'cors';

const app = express();
const port = process.env.PORT = 9000 || 9090;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', auth);
app.use('/api/buildings', buildings);
app.use('/api/apartments', apartments);
app.use('/api/expenses', expenses);
app.use('/api/expenseCategories', expenseCats);
app.use('/api/reports', expenseReports);

app.listen(port, () => console.log(`Express is running on port ${port}`)); // port and callback function