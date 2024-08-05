const express = require('express');
const axios = require('axios');
const router = express.Router();
const API_KEY = 'dcf2a96ac2msh3b96103ea1986dbp17cb6bjsn07dc8a095582'

// Rota para obter times
router.get('/teams', async (req, res) => {
    try {
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/teams', {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });

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
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });

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
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/teams/statistics', {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            },
            params: {
                id: teamId,
                season: season
            }
        });

        const statsResponse = response.data.response;

        if (!statsResponse || statsResponse.length === 0) {
            return res.status(404).json({ error: 'Estatísticas não encontradas para este time e temporada.' });
        }

        const stats = {
            games: statsResponse[0].games,
            fastBreakPoints: statsResponse[0].fastBreakPoints,
            pointsInPaint: statsResponse[0].pointsInPaint,
            biggestLead: statsResponse[0].biggestLead,
            secondChancePoints: statsResponse[0].secondChancePoints,
            pointsOffTurnovers: statsResponse[0].pointsOffTurnovers,
            points: statsResponse[0].points,
            fgm: statsResponse[0].fgm,
            fga: statsResponse[0].fga,
            fgp: statsResponse[0].fgp,
            ftm: statsResponse[0].ftm,
            fta: statsResponse[0].fta,
            ftp: statsResponse[0].ftp,
            tpm: statsResponse[0].tpm,
            tpa: statsResponse[0].tpa,
            tpp: statsResponse[0].tpp,
            offReb: statsResponse[0].offReb,
            defReb: statsResponse[0].defReb,
            totReb: statsResponse[0].totReb,
            assists: statsResponse[0].assists,
            pFouls: statsResponse[0].pFouls,
            steals: statsResponse[0].steals,
            turnovers: statsResponse[0].turnovers,
            blocks: statsResponse[0].blocks,
            plusMinus: statsResponse[0].plusMinus
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter os jogadores do time escolhido
router.get('/teams/:teamId/players', async (req, res) => {
    const teamId = req.params.teamId;
    const season = req.query.season;

    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        params: {
            team: teamId,
            season: season
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data.response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Jogadores não encontrados' });
    }
});

module.exports = router;
