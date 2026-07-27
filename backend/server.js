const express = require('express');
const app = express();
const port = process.env.PORT = 9000 || 9090;

let mock = [
    {id: 1, name: 'obj1'},
    {id: 2, name: 'obj2'},
    {id: 3, name: 'obj3'}
];

app.get('/api/mock', (req, res) => {
    res.json(mock);
});

app.get('/api/mock/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const obj = mock.find(o => o.id === id);
    if (obj) {
        res.json(obj);
    } else {
        res.status(404).json({ error: 'Object not found' });
    }
});

app.listen(port, () => console.log(`Express is running on port ${port}`)); // port and callback function