const ctx = document.getElementById('barChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['0-5', '5-6.5', '6.5-8', '8-9','9-10'],
        datasets: [{
            label: 'Số lượng',
            data: [10,20,10,20,33,24],
            borderWidth: 1
        }]
    },
    options: {
        reponsive:true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});