document.addEventListener('DOMContentLoaded', function () {
  const teamsComboBox = document.getElementById('teamsComboBox');
  const nbaForm = document.getElementById('nbaForm');
  const localHost = 'http://localhost:3000/'
  const EC2 = 'http://44.211.161.65/'

  // Função para buscar e preencher os times
  function loadTeams() {
    fetch(`${EC2}nba/teams`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Limpar a combobox
        teamsComboBox.innerHTML = '<option value="">Selecione um time</option>';

        // Preencher a combobox com os times
        data.forEach(team => {
          const option = document.createElement('option');
          option.value = team.id;
          option.textContent = team.name;
          teamsComboBox.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Erro ao buscar os times: ' + error.message);
      });
  }

  // Carregar os times automaticamente ao carregar a página
  loadTeams();

  // Adicionar evento de submit ao formulário
  nbaForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const teamId = teamsComboBox.value;
    if (teamId) {
      window.location.href = `team.html?teamId=${teamId}`;
    } else {
      alert('Por favor, selecione um time.');
    }
  });
});
