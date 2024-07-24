const express = require('express');
const axios = require('axios');
const router = express.Router();

// Rota para obter jogadores
router.get('/teams', async (req, res) => {
    try {
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/teams', {
            headers: {
                'X-RapidAPI-Key': '925c23d740msh27099c400c23653p18f9b4jsn0ba2e889297d',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
