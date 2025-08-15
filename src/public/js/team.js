document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("teamId");
  const seasonSelect = document.getElementById("seasonSelect");
  const teamStatsDiv = document.getElementById("teamStats");
  const teamInfoDiv = document.getElementById("teamInfo");
  const backButton = document.getElementById("backButton");
  const playersList = document.getElementById("playersList");
  // API base URL - automatically detects if running locally or on production
  const API_BASE_URL = window.location.origin + "/";

  if (teamId) {
    // IP da instância EC2 para acessar a API
    fetch(`${API_BASE_URL}api/nba/teams/${teamId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        teamInfoDiv.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Cidade: ${data.city}</p>
                    <p>Apelido: ${data.nickname}</p>
                    <p>Conferência: ${data.leagues.standard.conference}</p>
                    <p>Divisão: ${data.leagues.standard.division}</p>
                    <img src="${data.logo}" alt="${data.name} logo">
                `;
        loadTeamStats(seasonSelect.value); // Carregar estatísticas da temporada inicial
        loadTeamPlayers(seasonSelect.value); // Carregar jogadores da temporada inicial
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao buscar as informações do time: " + error.message);
      });
  } else {
    alert("Nenhum time selecionado");
  }

  // Adicionar evento de clique para o botão de voltar
  backButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // Função para carregar as estatísticas da temporada
  function loadTeamStats(season) {
    fetch(`${localHost}nba/teams/${teamId}/stats?season=${season}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((stats) => {
        // Create individual stat cards
        const statsCards = [
          { label: "Jogos", value: stats.games },
          { label: "Pontos", value: stats.points },
          { label: "Pontos de Contra-Ataque", value: stats.fastBreakPoints },
          { label: "Pontos no Garrafão", value: stats.pointsInPaint },
          { label: "Maior Vantagem", value: stats.biggestLead },
          {
            label: "Pontos de Segunda Chance",
            value: stats.secondChancePoints,
          },
          { label: "Pontos de Turnovers", value: stats.pointsOffTurnovers },
          {
            label: "Field Goals",
            value: `${stats.fgm} (${stats.fgp}%)`,
            showProgress: true,
            percentage: stats.fgp,
          },
          {
            label: "Free Throws",
            value: `${stats.ftm} (${stats.ftp}%)`,
            showProgress: true,
            percentage: stats.ftp,
          },
          {
            label: "3-Pointers",
            value: `${stats.tpm} (${stats.tpp}%)`,
            showProgress: true,
            percentage: stats.tpp,
          },
          { label: "Rebotes Ofensivos", value: stats.offReb },
          { label: "Rebotes Defensivos", value: stats.defReb },
          { label: "Total de Rebotes", value: stats.totReb },
          { label: "Assistências", value: stats.assists },
          { label: "Faltas", value: stats.pFouls },
          { label: "Roubos", value: stats.steals },
          { label: "Turnovers", value: stats.turnovers },
          { label: "Bloqueios", value: stats.blocks },
          { label: "Plus/Minus", value: stats.plusMinus },
        ];

        let statsHTML = "";
        statsCards.forEach((stat) => {
          statsHTML += `
                        <div class="stat-card">
                            <h3>${stat.label}</h3>
                            <div class="stat-value">${stat.value}</div>
                            ${
                              stat.showProgress
                                ? `
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${Math.min(
                                      stat.percentage,
                                      100
                                    )}%"></div>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    `;
        });

        teamStatsDiv.innerHTML = statsHTML;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao buscar as estatísticas: " + error.message);
      });
  }

  function loadTeamPlayers(season) {
    fetch(`${localHost}nba/teams/${teamId}/players?season=${season}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((players) => {
        let playersHTML = "";
        players.forEach((player) => {
          const position = player.leagues?.standard?.pos || "N/A";
          const jersey = player.leagues?.standard?.jersey || "N/A";

          playersHTML += `
                        <div class="player-card" id="player-${player.id}">
                            <div class="player-header">
                                <div class="player-name">${player.firstname} ${
            player.lastname
          }</div>
                                ${
                                  position !== "N/A"
                                    ? `<div class="position-badge">${position}</div>`
                                    : ""
                                }
                            </div>
                            <div class="player-basic-info">
                                <div class="player-info">Jersey: #${jersey}</div>
                                <div class="player-info">Height: ${
                                  player.height?.meters || "N/A"
                                }m</div>
                                <div class="player-info">Weight: ${
                                  player.weight?.kilograms || "N/A"
                                }kg</div>
                                <div class="player-info">Born: ${
                                  player.birth?.date || "N/A"
                                }</div>
                                <div class="player-info">Country: ${
                                  player.birth?.country || "N/A"
                                }</div>
                                <div class="player-info">College: ${
                                  player.college || "N/A"
                                }</div>
                            </div>
                            <button class="btn btn-primary stats-btn" onclick="togglePlayerStats(${
                              player.id
                            }, '${season}')">
                                <span>View Stats</span>
                            </button>
                            <div class="player-stats" id="stats-${
                              player.id
                            }" style="display: none;">
                                <div class="loading">Loading stats...</div>
                            </div>
                        </div>
                    `;
        });
        playersList.innerHTML = playersHTML;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao buscar os jogadores: " + error.message);
      });
  }
  seasonSelect.addEventListener("change", function () {
    loadTeamStats(seasonSelect.value);
    loadTeamPlayers(seasonSelect.value);
  });
});

// Function to toggle player statistics
function togglePlayerStats(playerId, season) {
  const statsDiv = document.getElementById(`stats-${playerId}`);
  const button = document.querySelector(`#player-${playerId} .stats-btn span`);

  if (statsDiv.style.display === "none") {
    // Show stats
    statsDiv.style.display = "block";
    button.textContent = "Hide Stats";

    // Load stats if not already loaded
    if (statsDiv.innerHTML.includes("Loading stats...")) {
      loadPlayerStats(playerId, season);
    }
  } else {
    // Hide stats
    statsDiv.style.display = "none";
    button.textContent = "View Stats";
  }
}

// Function to load individual player statistics
function loadPlayerStats(playerId, season) {
  const localHost = "http://localhost:3000/";
  const statsDiv = document.getElementById(`stats-${playerId}`);

  fetch(`${localHost}nba/players/${playerId}/stats?season=${season}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((stats) => {
      const statsCards = [
        { label: "Games Played", value: stats.games },
        { label: "Points (avg)", value: stats.points },
        { label: "Assists (avg)", value: stats.assists },
        { label: "Rebounds (avg)", value: stats.totReb },
        { label: "Steals (avg)", value: stats.steals },
        { label: "Blocks (avg)", value: stats.blocks },
        { label: "Turnovers (avg)", value: stats.turnovers },
        { label: "Minutes (avg)", value: stats.min },
        {
          label: "FG%",
          value: `${stats.fgp}%`,
          showProgress: true,
          percentage: parseFloat(stats.fgp),
        },
        {
          label: "FT%",
          value: `${stats.ftp}%`,
          showProgress: true,
          percentage: parseFloat(stats.ftp),
        },
        {
          label: "3P%",
          value: `${stats.tpp}%`,
          showProgress: true,
          percentage: parseFloat(stats.tpp),
        },
      ];

      let statsHTML = '<div class="player-stats-grid">';
      statsCards.forEach((stat) => {
        statsHTML += `
                    <div class="player-stat-card">
                        <div class="stat-label">${stat.label}</div>
                        <div class="stat-value">${stat.value}</div>
                        ${
                          stat.showProgress
                            ? `
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${Math.min(
                                  stat.percentage,
                                  100
                                )}%"></div>
                            </div>
                        `
                            : ""
                        }
                    </div>
                `;
      });
      statsHTML += "</div>";

      statsDiv.innerHTML = statsHTML;
    })
    .catch((error) => {
      console.error("Error:", error);
      statsDiv.innerHTML = `
                <div class="error-message">
                    <p>Unable to load player statistics</p>
                    <p class="error-details">${error.message}</p>
                </div>
            `;
    });
}
