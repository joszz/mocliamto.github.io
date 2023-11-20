fetch('../../assets/epilepsy.json')
    .then(response => response.json())
    .then(data => {
        const aanvalsregistratieData = {
            labels: data.Aanvalsregistratie
                .sort((a, b) => new Date(a.datum) - new Date(b.datum))
                .map(entry => entry.datum),
            datasets: [{
                label: 'Aanvalsregistratie',
                data: data.Aanvalsregistratie.map(item => item.aantal),
                backgroundColor: 'rgb(246,187,200)',
            }]
        };

        const medicatieData = {
            labels: data.Medicatie
                .sort((a, b) => new Date(a.datum) - new Date(b.datum))
                .map(entry => entry.datum),
            datasets: [{
                label: 'Medicatie (mg)',
                data: data.Medicatie.map(item => item.dosis),
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
            }]
        };

        const chartOptions = {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        parser: 'YY-MM-DD HH:mm',
                        tooltipFormat: 'll HH:mm'
                    },
                    title: {
                        display: true,
                        text: 'Date and Time'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        };

        new Chart(document.getElementById('seizureChart'), {
            type: 'bar',
            data: aanvalsregistratieData,
            options: chartOptions
        });

        new Chart(document.getElementById('medicationChart'), {
            type: 'line',
            data: medicatieData,
            options: chartOptions
        });
    })
    .catch(error => {
        console.error("Error fetching the data: ", error);
    });
