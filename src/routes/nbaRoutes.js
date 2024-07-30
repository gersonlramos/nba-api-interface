const express = require('express');
const axios = require('axios');
const router = express.Router();

// Rota para obter times
router.get('/teams', async (req, res) => {
    try {
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/teams', {
            headers: {
                'X-RapidAPI-Key': '925c23d740msh27099c400c23653p18f9b4jsn0ba2e889297d',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        // Filtrar e mapear times que são franquias da NBA
        const teams = response.data.response
            .filter(team => team.nbaFranchise)
            .map(team => ({
                id: team.id,
                name: team.name
            }));

        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter jogadores
router.get('/players', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        params: {
            team: '1',
            season: '2023'
        },
        headers: {
            'x-rapidapi-key': '925c23d740msh27099c400c23653p18f9b4jsn0ba2e889297d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;