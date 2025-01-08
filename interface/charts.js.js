function renderCharts() {
  const ctx = document.getElementById('studyChart').getContext('2d');
  const revisionCtx = document.getElementById('revisionChart').getContext('2d');

  const studyCount = history.filter(h => h.type === 'Estudo').length;
  const revisionCount = history.filter(h => h.type === 'Revisão').length;

  const correctAnswers = history.reduce((sum, h) => sum + (h.correctAnswers || 0), 0);
  const totalQuestions = history.reduce((sum, h) => sum + (h.questions || 0), 0);
  const accuracy = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(1) : 0;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Estudos', 'Revisões'],
      datasets: [{
        label: 'Atividades Concluídas',
        data: [studyCount, revisionCount],
        backgroundColor: ['#4caf50', '#fbc02d']
      }]
    }
  });

  new Chart(revisionCtx, {
    type: 'doughnut',
    data: {
      labels: ['Acertos', 'Erros'],
      datasets: [{
        data: [correctAnswers, totalQuestions - correctAnswers],
        backgroundColor: ['#42a5f5', '#ef5350']
      }]
    }
  });

  document.getElementById('accuracy').innerText = `Precisão Média: ${accuracy}%`;
}
