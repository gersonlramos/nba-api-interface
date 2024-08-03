const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const nbaRoutes = require('./routes/nbaRoutes');

app.use(cors()); 
app.use('/nba', nbaRoutes);

// Servir arquivos estáticos da pasta 'src'
app.use(express.static(path.join(__dirname)));

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a página de times
app.get('/team', (req, res) => {
    res.sendFile(path.join(__dirname, 'team.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
