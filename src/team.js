document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('teamId');

    if (teamId) {
        fetch(`http://localhost:3000/nba/teams/${teamId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const teamInfoDiv = document.getElementById('teamInfo');
                teamInfoDiv.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Cidade: ${data.city}</p>
                    <p>Apelido: ${data.nickname}</p>
                    <p>Conferência: ${data.leagues.standard.conference}</p>
                    <p>Divisão: ${data.leagues.standard.division}</p>
                    <img src="${data.logo}" alt="${data.name} logo">
                `;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao buscar as informações do time: ' + error.message);
            });
    } else {
        alert('Nenhum time selecionado');
    }
});
