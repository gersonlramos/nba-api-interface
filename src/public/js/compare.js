document.addEventListener("DOMContentLoaded", function () {
  // API base URL - automatically detects if running locally or on production
  const API_BASE_URL = window.location.origin + "/";

  // DOM elements
  const backButton = document.getElementById("backButton");
  const compareButton = document.getElementById("compareButton");
  const comparisonResults = document.getElementById("comparisonResults");

  // Player 1 elements
  const season1 = document.getElementById("season1");
  const team1 = document.getElementById("team1");
  const player1 = document.getElementById("player1");

  // Player 2 elements
  const season2 = document.getElementById("season2");
  const team2 = document.getElementById("team2");
  const player2 = document.getElementById("player2");

  // Back button functionality
  backButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // Load teams on page load
  loadTeams();

  // Event listeners for team selection
  team1.addEventListener("change", function () {
    loadPlayers(1, team1.value, season1.value);
  });

  team2.addEventListener("change", function () {
    loadPlayers(2, team2.value, season2.value);
  });

  // Event listeners for season changes
  season1.addEventListener("change", function () {
    if (team1.value) {
      loadPlayers(1, team1.value, season1.value);
    }
  });

  season2.addEventListener("change", function () {
    if (team2.value) {
      loadPlayers(2, team2.value, season2.value);
    }
  });

  // Event listeners for player selection
  player1.addEventListener("change", checkCompareButton);
  player2.addEventListener("change", checkCompareButton);

  // Compare button functionality
  compareButton.addEventListener("click", function () {
    if (player1.value && player2.value) {
      comparePlayers();
    }
  });

  // Load teams function
  function loadTeams() {
    fetch(`${localHost}nba/teams`)
      .then((response) => response.json())
      .then((data) => {
        const teamOptions =
          '<option value="">Select team...</option>' +
          data
            .map((team) => `<option value="${team.id}">${team.name}</option>`)
            .join("");

        team1.innerHTML = teamOptions;
        team2.innerHTML = teamOptions;
      })
      .catch((error) => {
        console.error("Error loading teams:", error);
        alert("Error loading teams: " + error.message);
      });
  }

  // Load players function
  function loadPlayers(playerNumber, teamId, season) {
    const playerSelect = playerNumber === 1 ? player1 : player2;

    playerSelect.innerHTML = '<option value="">Loading players...</option>';
    playerSelect.disabled = true;

    fetch(`${localHost}nba/teams/${teamId}/players?season=${season}`)
      .then((response) => response.json())
      .then((data) => {
        const playerOptions =
          '<option value="">Select player...</option>' +
          data
            .map(
              (player) =>
                `<option value="${player.id}">${player.firstname} ${player.lastname}</option>`
            )
            .join("");

        playerSelect.innerHTML = playerOptions;
        playerSelect.disabled = false;
        checkCompareButton();
      })
      .catch((error) => {
        console.error("Error loading players:", error);
        playerSelect.innerHTML =
          '<option value="">Error loading players</option>';
        playerSelect.disabled = false;
      });
  }

  // Check if compare button should be enabled
  function checkCompareButton() {
    compareButton.disabled = !(player1.value && player2.value);
  }

  // Compare players function
  function comparePlayers() {
    comparisonResults.style.display = "block";

    // Reset results
    document.getElementById("player1Stats").innerHTML =
      '<div class="loading">Loading player 1 stats...</div>';
    document.getElementById("player2Stats").innerHTML =
      '<div class="loading">Loading player 2 stats...</div>';

    // Load both players' stats
    Promise.all([
      loadPlayerStats(player1.value, season1.value),
      loadPlayerStats(player2.value, season2.value),
    ])
      .then(([stats1, stats2]) => {
        displayComparison(stats1, stats2);
      })
      .catch((error) => {
        console.error("Error comparing players:", error);
        alert("Error comparing players: " + error.message);
      });
  }

  // Load player stats
  function loadPlayerStats(playerId, season) {
    return fetch(`${localHost}nba/players/${playerId}/stats?season=${season}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load player stats");
        }
        return response.json();
      })
      .then((stats) => {
        // Get player name
        const playerSelect = player1.value === playerId ? player1 : player2;
        const playerName =
          playerSelect.options[playerSelect.selectedIndex].text;

        return {
          name: playerName,
          season: season,
          stats: stats,
        };
      });
  }

  // Display comparison
  function displayComparison(player1Data, player2Data) {
    const statsToCompare = [
      { key: "games", label: "Games Played", higherIsBetter: true },
      { key: "points", label: "Points (avg)", higherIsBetter: true },
      { key: "assists", label: "Assists (avg)", higherIsBetter: true },
      { key: "totReb", label: "Rebounds (avg)", higherIsBetter: true },
      { key: "steals", label: "Steals (avg)", higherIsBetter: true },
      { key: "blocks", label: "Blocks (avg)", higherIsBetter: true },
      { key: "turnovers", label: "Turnovers (avg)", higherIsBetter: false },
      { key: "min", label: "Minutes (avg)", higherIsBetter: true },
      { key: "fgp", label: "FG%", higherIsBetter: true, isPercentage: true },
      { key: "ftp", label: "FT%", higherIsBetter: true, isPercentage: true },
      { key: "tpp", label: "3P%", higherIsBetter: true, isPercentage: true },
    ];

    // Generate HTML for player 1
    let player1HTML = `
            <div class="player-comparison-header">
                <h3>${player1Data.name}</h3>
                <p>Season ${player1Data.season}</p>
            </div>
            <div class="comparison-stats-grid">
        `;

    // Generate HTML for player 2
    let player2HTML = `
            <div class="player-comparison-header">
                <h3>${player2Data.name}</h3>
                <p>Season ${player2Data.season}</p>
            </div>
            <div class="comparison-stats-grid">
        `;

    statsToCompare.forEach((stat) => {
      const value1 = parseFloat(player1Data.stats[stat.key]) || 0;
      const value2 = parseFloat(player2Data.stats[stat.key]) || 0;

      let winner1 = false;
      let winner2 = false;

      if (value1 !== value2) {
        if (stat.higherIsBetter) {
          winner1 = value1 > value2;
          winner2 = value2 > value1;
        } else {
          winner1 = value1 < value2;
          winner2 = value2 < value1;
        }
      }

      const displayValue1 = stat.isPercentage ? `${value1}%` : value1;
      const displayValue2 = stat.isPercentage ? `${value2}%` : value2;

      player1HTML += `
                <div class="comparison-stat-card ${
                  winner1 ? "winner" : winner2 ? "loser" : "tie"
                }">
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${displayValue1}</div>
                    ${
                      stat.isPercentage
                        ? `
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(
                              value1,
                              100
                            )}%"></div>
                        </div>
                    `
                        : ""
                    }
                </div>
            `;

      player2HTML += `
                <div class="comparison-stat-card ${
                  winner2 ? "winner" : winner1 ? "loser" : "tie"
                }">
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${displayValue2}</div>
                    ${
                      stat.isPercentage
                        ? `
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(
                              value2,
                              100
                            )}%"></div>
                        </div>
                    `
                        : ""
                    }
                </div>
            `;
    });

    player1HTML += "</div>";
    player2HTML += "</div>";

    document.getElementById("player1Stats").innerHTML = player1HTML;
    document.getElementById("player2Stats").innerHTML = player2HTML;
  }
});
