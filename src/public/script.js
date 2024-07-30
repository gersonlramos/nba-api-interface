const express = require('express');
const app = express();
const PORT = 3000;

const nbaRoutes = require('../routes/nbaRoutes');

app.use('/nba', nbaRoutes);

app.get('/', (req, res) => {
    res.send('API da NBA com Node.js');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});