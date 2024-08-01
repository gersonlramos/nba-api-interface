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
                name: team.name,
                city: team.city,
                nickname: team.nickname,
                logo: team.logo,
                leagues: team.leagues
            }));

        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter informações de um time específico
router.get('/teams/:id', async (req, res) => {
    try {
        const teamId = req.params.id;
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/teams', {
            headers: {
                'X-RapidAPI-Key': '925c23d740msh27099c400c23653p18f9b4jsn0ba2e889297d',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });

        // Encontrar o time específico pelo ID
        const team = response.data.response.find(team => team.id == teamId);

        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ error: 'Time não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter estatísticas de um time específico para um ano
router.get('/teams/:id/stats', async (req, res) => {
    try {
        const teamId = req.params.id;
        const season = req.query.season;
        const response = await axios.get(`https://api-nba-v1.p.rapidapi.com/teams/statistics`, {
            headers: {
                'X-RapidAPI-Key': '925c23d740msh27099c400c23653p18f9b4jsn0ba2e889297d',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            },
            params: {
                team: teamId,
                season: season
            }
        });

        // Extrair estatísticas relevantes
        const stats = {
            wins: response.data.response.wins,
            losses: response.data.response.losses,
            points_per_game: response.data.response.pointsPerGame,
            rebounds_per_game: response.data.response.reboundsPerGame,
            assists_per_game: response.data.response.assistsPerGame
        };

        res.json(stats);
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