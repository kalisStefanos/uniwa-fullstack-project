import express from 'express';
import buildings from './routes/buildings.js';

const app = express();
const port = process.env.PORT = 9000 || 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/buildings', buildings);

app.listen(port, () => console.log(`Express is running on port ${port}`)); // port and callback function