const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const nbaRoutes = require('./routes/nbaRoutes');

app.use(cors()); 
app.use('/nba', nbaRoutes);

app.get('/', (req, res) => {
    res.send('API da NBA em Node.js');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

function updateStats() {
    const team1Name = document.getElementById("team1Input").value;
    const team2Name = document.getElementById("team2Input").value;

    const team1Stats = teamsData[team1Name];
    const team2Stats = teamsData[team2Name];

    if (team1Stats) {
        document.getElementById("team1").querySelector("h2").textContent = team1Name;
        document.getElementById("team1Stats").innerHTML = `
            <li>Pontos por jogo: ${team1Stats.points}</li>
            <li>Rebotes por jogo: ${team1Stats.rebounds}</li>
            <li>Assistências por jogo: ${team1Stats.assists}</li>
            <li>Porcentagem de vitória: ${team1Stats.winPercentage}%</li>
        `;
    }

    if (team2Stats) {
        document.getElementById("team2").querySelector("h2").textContent = team2Name;
        document.getElementById("team2Stats").innerHTML = `
            <li>Pontos por jogo: ${team2Stats.points}</li>
            <li>Rebotes por jogo: ${team2Stats.rebounds}</li>
            <li>Assistências por jogo: ${team2Stats.assists}</li>
            <li>Porcentagem de vitória: ${team2Stats.winPercentage}%</li>
        `;
    }
}
