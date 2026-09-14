// Fetch summary data and draw the three charts

async function drawPieChart() {
  const res = await fetch('/api/category-summary');
  const data = await res.json();

  new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: data.map(d => d.category),
      datasets: [{
        data: data.map(d => Number(d.total))
      }]
    }
  });
}

async function drawMonthlyCharts() {
  const res = await fetch('/api/monthly-summary');
  const data = await res.json();

  // Build a sorted list of unique months
  const months = [...new Set(data.map(d => d.month))].sort();

  // Separate income and expense totals per month
  const income = months.map(m => {
    const row = data.find(d => d.month === m && d.type === 'income');
    return row ? Number(row.total) : 0;
  });
  const expense = months.map(m => {
    const row = data.find(d => d.month === m && d.type === 'expense');
    return row ? Number(row.total) : 0;
  });

  // Bar chart: income vs expenses
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        { label: 'Income', data: income },
        { label: 'Expenses', data: expense }
      ]
    }
  });

  // Line chart: expenses over time
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: 'Expenses', data: expense, fill: false, tension: 0.2 }
      ]
    }
  });
}

drawPieChart();
drawMonthlyCharts();