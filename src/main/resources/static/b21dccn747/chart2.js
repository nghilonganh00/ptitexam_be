const ctx2 = document.getElementById('doughnut');

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Hoàn thành', 'Chưa hoàn thành'],
      datasets: [{
        label: 'Tỷ lệ hoàn thành',
        data: [12, 19],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      
    }
  });