const ctx = document.getElementById('epilepsy-chart-js');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }],
        title: {
            text: 'Epilepsy',
            align: 'left'
        }
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Epilepsie',
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
