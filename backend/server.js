import app from './app.js';

const port = process.env.PORT = 9000 || 9090;
app.listen(port, () => console.log(`Express is running on port ${port}`));