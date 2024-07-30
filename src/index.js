document.getElementById('nbaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('query').value;
    fetch(`/nba?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.error) {
                resultsDiv.innerHTML = `<p>${data.error}</p>`;
            } else {
                data.results.forEach(item => {
                    resultsDiv.innerHTML += `<p>${item.name}: ${item.value}</p>`;
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('listTeams').addEventListener('click', function() {
    fetch('/nba/teams')
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            data.forEach(team => {
                resultsDiv.innerHTML += `<p>${team.name}</p>`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
