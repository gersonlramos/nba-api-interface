/**
 * NBA API Routes
 * Handles all NBA-related API endpoints with proper error handling and configuration
 */

const express = require("express");
const axios = require("axios");
const config = require("../config/config");

const router = express.Router();

// API configuration
const { rapidApiKey, rapidApiHost, baseUrl } = config.api;

// Common headers for RapidAPI requests
const getApiHeaders = () => ({
  "X-RapidAPI-Key": rapidApiKey,
  "X-RapidAPI-Host": rapidApiHost,
});

// Rota para obter times
router.get("/teams", async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/teams`, {
      headers: getApiHeaders(),
    });

    const teams = response.data.response
      .filter((team) => team.nbaFranchise)
      .map((team) => ({
        id: team.id,
        name: team.name,
        city: team.city,
        nickname: team.nickname,
        logo: team.logo,
        leagues: team.leagues,
      }));

    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter informações de um time específico
router.get("/teams/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const response = await axios.get(
      "https://api-nba-v1.p.rapidapi.com/teams",
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
      }
    );

    const team = response.data.response.find((team) => team.id == teamId);

    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: "Time não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter estatísticas de um time específico para um ano
router.get("/teams/:id/stats", async (req, res) => {
  try {
    const teamId = req.params.id;
    const season = req.query.season;
    const response = await axios.get(
      "https://api-nba-v1.p.rapidapi.com/teams/statistics",
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
        params: {
          id: teamId,
          season: season,
        },
      }
    );

    const statsResponse = response.data.response;

    if (!statsResponse || statsResponse.length === 0) {
      return res.status(404).json({
        error: "Estatísticas não encontradas para este time e temporada.",
      });
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
      plusMinus: statsResponse[0].plusMinus,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter os jogadores do time escolhido
router.get("/teams/:teamId/players", async (req, res) => {
  const teamId = req.params.teamId;
  const season = req.query.season;

  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/players",
    params: {
      team: teamId,
      season: season,
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data.response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Jogadores não encontrados" });
  }
});

// Rota para obter estatísticas de um jogador específico
router.get("/players/:playerId/stats", async (req, res) => {
  const playerId = req.params.playerId;
  const season = req.query.season || "2022";

  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/players/statistics",
    params: {
      id: playerId,
      season: season,
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const statsResponse = response.data.response;

    if (!statsResponse || statsResponse.length === 0) {
      return res.status(404).json({
        error: "Estatísticas não encontradas para este jogador e temporada.",
      });
    }

    // Calculate averages from all games
    const totalGames = statsResponse.length;
    const stats = {
      games: totalGames,
      points: (
        statsResponse.reduce((sum, game) => sum + (game.points || 0), 0) /
        totalGames
      ).toFixed(1),
      assists: (
        statsResponse.reduce((sum, game) => sum + (game.assists || 0), 0) /
        totalGames
      ).toFixed(1),
      totReb: (
        statsResponse.reduce((sum, game) => sum + (game.totReb || 0), 0) /
        totalGames
      ).toFixed(1),
      steals: (
        statsResponse.reduce((sum, game) => sum + (game.steals || 0), 0) /
        totalGames
      ).toFixed(1),
      blocks: (
        statsResponse.reduce((sum, game) => sum + (game.blocks || 0), 0) /
        totalGames
      ).toFixed(1),
      turnovers: (
        statsResponse.reduce((sum, game) => sum + (game.turnovers || 0), 0) /
        totalGames
      ).toFixed(1),
      fgp: (
        statsResponse.reduce(
          (sum, game) => sum + (parseFloat(game.fgp) || 0),
          0
        ) / totalGames
      ).toFixed(1),
      ftp: (
        statsResponse.reduce(
          (sum, game) => sum + (parseFloat(game.ftp) || 0),
          0
        ) / totalGames
      ).toFixed(1),
      tpp: (
        statsResponse.reduce(
          (sum, game) => sum + (parseFloat(game.tpp) || 0),
          0
        ) / totalGames
      ).toFixed(1),
      min: (
        statsResponse.reduce(
          (sum, game) => sum + (parseFloat(game.min) || 0),
          0
        ) / totalGames
      ).toFixed(1),
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar estatísticas do jogador" });
  }
});

module.exports = router;
