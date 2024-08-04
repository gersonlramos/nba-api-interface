document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('teamId');
    const seasonSelect = document.getElementById('seasonSelect');
    const teamStatsDiv = document.getElementById('teamStats');
    const teamInfoDiv = document.getElementById('teamInfo');
    const backButton = document.getElementById('backButton');

    if (teamId) {
        // IP da instância EC2 para acessar a API
        fetch(`http://44.211.161.65/nba/teams/${teamId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                teamInfoDiv.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Cidade: ${data.city}</p>
                    <p>Apelido: ${data.nickname}</p>
                    <p>Conferência: ${data.leagues.standard.conference}</p>
                    <p>Divisão: ${data.leagues.standard.division}</p>
                    <img src="${data.logo}" alt="${data.name} logo">
                `;
                loadTeamStats(seasonSelect.value); // Carregar estatísticas da temporada inicial
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao buscar as informações do time: ' + error.message);
            });
    } else {
        alert('Nenhum time selecionado');
    }

    // Adicionar evento de clique para o botão de voltar
    backButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // Função para carregar as estatísticas da temporada
    function loadTeamStats(season) {
        fetch(`http://44.211.161.65/nba/teams/${teamId}/stats?season=${season}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(stats => {
                teamStatsDiv.innerHTML = `
                    <h3>Estatísticas da Temporada ${season}</h3>
                    <p>Jogos: ${stats.games}</p>
                    <p>Pontos de Contra-Ataque: ${stats.fastBreakPoints}</p>
                    <p>Pontos no Garrafão: ${stats.pointsInPaint}</p>
                    <p>Maior Vantagem: ${stats.biggestLead}</p>
                    <p>Pontos de Segunda Chance: ${stats.secondChancePoints}</p>
                    <p>Pontos de Turnovers: ${stats.pointsOffTurnovers}</p>
                    <p>Pontos: ${stats.points}</p>
                    <p>FGM: ${stats.fgm} (${stats.fgp}%)</p>
                    <p>FTM: ${stats.ftm} (${stats.ftp}%)</p>
                    <p>3PM: ${stats.tpm} (${stats.tpp}%)</p>
                    <p>Rebotes Ofensivos: ${stats.offReb}</p>
                    <p>Rebotes Defensivos: ${stats.defReb}</p>
                    <p>Total de Rebotes: ${stats.totReb}</p>
                    <p>Assistências: ${stats.assists}</p>
                    <p>Faltas: ${stats.pFouls}</p>
                    <p>Roubos: ${stats.steals}</p>
                    <p>Turnovers: ${stats.turnovers}</p>
                    <p>Bloqueios: ${stats.blocks}</p>
                    <p>Plus/Minus: ${stats.plusMinus}</p>
                `;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao buscar as estatísticas: ' + error.message);
            });
    }

    // Adicionar evento para mudar o ano da temporada
    seasonSelect.addEventListener('change', function () {
        loadTeamStats(seasonSelect.value);
    });
});