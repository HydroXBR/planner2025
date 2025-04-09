
function round(numero, casasDecimais) {
    casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 2;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais))
}

function getAdjustedDate(date) {
    let adjustedDate = new Date(date);
    if (hasYestTrue()) {
        adjustedDate.setDate(adjustedDate.getDate() - hasYestTrue()[1]);
    }
    return adjustedDate
}

function hasYestTrue() {
    const params = new URLSearchParams(window.location.search);
    if(params.get('yest') === 'true') return [true, params.get('days') ? Number(params.get('days')) : 1]
    return false
}

async function fetchData() {
    const response = await fetch('http://127.0.0.1:3000/data')
    const data = await response.json()
    return data
}

async function fetchCronograma() {
    const response = await fetch('http://127.0.0.1:3000/cronograma')
    const data = await response.json()
    return data
}

function getDiaDaSemana() {
    const diasDaSemana = [
      "domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"
    ]
  
    const hoje = getAdjustedDate(new Date())
    const dia = hoje.getDay()
    return diasDaSemana[dia]
}

function formatDate(date) {
    return date.toLocaleDateString('pt-BR');
}

function abrirPDF(disc, vol, pag) {
    const filePath = `/poliedro/${disc}/${disc} ${vol}.pdf#page=${pag ? pag : 1}`;
    window.open(filePath, "_blank", "toolbar=false, scrollbars=false,resizable=false");
}

async function escolherCronograma() {
    const cronograma = await fetchCronograma(); 
    const diaHoje = getDiaDaSemana()
    return cronograma[diaHoje]
}

async function buscarPrimeiroTopicNaoConcluido(materia) {
    let response = await fetch('http://127.0.0.1:3000/data')
    let subjectData = await response.json()
    let ttopic = subjectData.find(e => e.subject == materia)
    if (!ttopic) {
        document.getElementById("aviso").innerText = `Disciplina "${materia}" não encontrada!`;
        setTimeout(() => {
            document.getElementById("aviso").innerText = ""
        }, 2000)
        return
    }
    let diahoje = ttopic.topics.find(e => formatDate(new Date(e.view)) == formatDate(new Date()))
   if(diahoje) return;
    let topic = ttopic.topics.find(topic => topic.concluido === false)
    return topic
}

async function buscarRevisao() {
    try {
        const response = await fetch('http://127.0.0.1:3000/data');
        const subjectData = await response.json();
        const quinzeDias = 30 * 24 * 60 * 60 * 1000; // 15 dias em milissegundos

        const topicsarray = [];

        // Função para verificar se há revisões dentro de 15 dias
        const hasReview = (reviews) => {
            if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return false;
            return reviews.some((r) => new Date() - new Date(r.data) <= quinzeDias);
        };

        // Itera pelas disciplinas e seus tópicos
        for (const subject of subjectData) {
            const topics = subject.topics.filter((t) =>
                t.concluido &&
                (new Date() - new Date(t.view) >= quinzeDias) &&
                !hasReview(t.reviews)
            );

            for (const topic of topics) {
                topicsarray.push({ ...topic, materia: subject.subject });
            }
        }

        return topicsarray;
    } catch (error) {
        console.error("Erro ao buscar revisão:", error);
        return [];
    }
}

async function atualizarTopico(topicId, materia, topicData) {
    let adjustedDate = new Date();
    adjustedDate.setUTCHours(adjustedDate.getUTCHours() - 4);
    if (hasYestTrue()) {
        adjustedDate.setDate(adjustedDate.getDate() - hasYestTrue()[1]);
    }

    const resposta = await fetch('http://127.0.0.1:3000/update-topic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topicId,  
            materia,  
            updates: {
                concluido: true,
                view: adjustedDate, 
                ...topicData 
            }
        })
    });
    const dados = await resposta.json()
    return dados
}

async function adicionarRevisao(topicId, reviewData) {
    const resposta = await fetch('http://127.0.0.1:3000/add-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topicId,
            review: reviewData
        })
    });
    const dados = await resposta.json();
    return dados;
}

async function setCronograma() {
    let materias = await escolherCronograma()  // 
    let tbody = document.getElementById('tbodytoday')

    if (Array.isArray(materias)) {  
        for (let materia of materias) {
            let topic = await buscarPrimeiroTopicNaoConcluido(materia); 

            if (topic) {
                let novaLinha = document.createElement('tr')
                novaLinha.id = topic._id

                let celula1 = document.createElement('td')
                celula1.textContent = materia
                novaLinha.appendChild(celula1)

                let celula2 = document.createElement('td')
                celula2.textContent = topic.assunto
                celula2.onclick = function(e){
                    abrirPDF(materia, topic.volume, topic.pinicial);
                }

                novaLinha.appendChild(celula2)

                let celula3 = document.createElement('td')
                celula3.textContent = topic.volume
                novaLinha.appendChild(celula3)

                let celula4 = document.createElement('td')
                celula4.textContent = topic.frente
                novaLinha.appendChild(celula4)

                let celula5 = document.createElement('td')
                celula5.textContent = topic.pinicial
                novaLinha.appendChild(celula5)

                let celula11 = document.createElement('td')
                celula11.textContent = topic.pfinal
                novaLinha.appendChild(celula11)

                let celula6 = document.createElement('td')
                celula6.textContent = topic.prop
                celula6.onclick = function(e){
                    abrirPDF(materia, topic.volume, topic.prop);
                }
                novaLinha.appendChild(celula6)

                let celula7 = document.createElement('td')
                let inputfeitas = document.createElement("input")
                inputfeitas.type = "number"
                inputfeitas.id = "feitas"
                celula7.appendChild(inputfeitas)
                novaLinha.appendChild(celula7)

                let celula8 = document.createElement('td')
                let inputcorretas = document.createElement("input")
                inputcorretas.type = "number"
                inputcorretas.id = "corretas"
                celula8.appendChild(inputcorretas)
                novaLinha.appendChild(celula8)

                let celula9 = document.createElement('td')
                let inpdifficinput = document.createElement("input")
                inpdifficinput.type = "number"
                inpdifficinput.min = 0
                inpdifficinput.max = 5
                inpdifficinput.step = 1; 
                inpdifficinput.id = "rating"
                inpdifficinput.name = "rating"
                celula9.appendChild(inpdifficinput)
                novaLinha.appendChild(celula9)

                let celula10 = document.createElement('td');
                let botaoEstudar = document.createElement('button');
                botaoEstudar.textContent = 'Estudar';
                botaoEstudar.addEventListener('click', async () => {
                    await atualizarTopico(topic._id, materia, { difficult: inpdifficinput.value, questoesTotais: inputfeitas.value, questoesCorretas: inputcorretas.value })
                    let dc = document.getElementById(topic._id)
                    dc.innerText = ""
                    let conc = document.createElement('td')
                    conc.colSpan = 10
                    conc.classList.add("concluido")
                    conc.textContent = `Disciplina ${materia} concluída, parabéns!`
                    dc.appendChild(conc)
                    alert('Matéria concluída!')
                });
                celula10.appendChild(botaoEstudar)
                novaLinha.appendChild(celula10)

                tbody.appendChild(novaLinha)
            }
        }
    } else {
        console.error("O cronograma para hoje não é um array válido.")
    }
}



async function setReview() {
    const tbody2 = document.getElementById('tbodytoday2')
    let tc = await buscarRevisao(); 
    if (tc.length > 0) {
        for(const topic of tc){
            let novaLinha = document.createElement('tr')
            novaLinha.id = topic._id

            let celula1 = document.createElement('td')
            celula1.textContent = topic.materia
            novaLinha.appendChild(celula1)

            let celula2 = document.createElement('td')
            celula2.textContent = topic.assunto
            celula2.onclick = function(e){
                abrirPDF(topic.materia, topic.volume, topic.pfinal);
            }
            novaLinha.appendChild(celula2)

            let celula5 = document.createElement('td')
            celula5.textContent = topic.pfinal
            novaLinha.appendChild(celula5)

            let celula7 = document.createElement('td')
            let inputfeitas = document.createElement("input")
            inputfeitas.type = "number"
            inputfeitas.id = "feitas"
            celula7.appendChild(inputfeitas)
            novaLinha.appendChild(celula7)

            let celula8 = document.createElement('td')
            let inputcorretas = document.createElement("input")
            inputcorretas.type = "number"
            inputcorretas.id = "corretas"
            celula8.appendChild(inputcorretas)
            novaLinha.appendChild(celula8)

            let celula10 = document.createElement('td');
            let botaoEstudar = document.createElement('button');
            botaoEstudar.textContent = 'Revisar';
            botaoEstudar.addEventListener('click', async () => {
                let novaRevisao = {
                    data: new Date(),
                    questoesTotais: parseInt(inputfeitas.value),
                    acertos: parseInt(inputcorretas.value)
                };

                try {
                    let resultado = await adicionarRevisao(topic._id, novaRevisao);
                    if (resultado.success) {
                        alert('Revisão adicionada com sucesso!');
                    } else {
                        alert('Erro ao adicionar revisão.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao conectar com o servidor.');
                }
            });
            celula10.appendChild(botaoEstudar);
            novaLinha.appendChild(celula10);

            tbody2.appendChild(novaLinha)
        
        }
    }else{
        document.getElementById("review").style.display = "none"
    }
}


async function setLastWeekData() {
    const seteDias = 7 * 24 * 60 * 60 * 1000;
    const hoje = new Date();

    const data = await fetchData();
    const estudados = data.flatMap(subject => 
        subject.topics.filter(topic => {
            if (!topic.view) return false; 
            const diff = hoje - new Date(topic.view);
            return diff <= seteDias; 
        }).map(topic => ({
            ...topic,
            materia: subject.subject 
        }))
    );

    const contagemMaterias = estudados.reduce((acc, topic) => {
        acc[topic.materia] = (acc[topic.materia] || 0) + 1;
        return acc;
    }, {});

    return {
        materias: Object.keys(contagemMaterias),
        topicosPorMateria: Object.values(contagemMaterias),
        questoesTotais: estudados.reduce((acc, topic) => acc + (topic.questoesTotais || 0), 0),
        questoesCorretas: estudados.reduce((acc, topic) => acc + (topic.questoesCorretas || 0), 0)
    };
}

async function renderizeDays() {
    const studyData = [];
    const data = await fetchData(); 
    const hoje = new Date(); 

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setUTCDate(hoje.getUTCDate() - i);
        date.setUTCHours(date.getUTCHours() - 4);
    
        const formattedDate = date.toISOString().split("T")[0];
    
        studyData.push({
            date: formattedDate,
            subjects: []
        });
    }

    data.forEach(subject => {
        subject.topics.forEach(topic => {
            if (!topic.view) return;
            
            const viewDate = new Date(topic.view).toISOString().split("T")[0];
            const studyDay = studyData.find(day => day.date === viewDate);
            
            if (studyDay) {
                if (!studyDay.subjects.includes(subject.subject)) {
                    studyDay.subjects.push(subject.subject);
                }
            }
        });
    });

    return studyData;
}

let studyChartInstance; // Variável global para armazenar a instância do gráfico

async function createChart() {
    const studyData = await renderizeDays();
    const ctx = document.getElementById('studyChart2').getContext('2d');

    if (studyChartInstance) {
        studyChartInstance.destroy();
    }

    const chartData = {
        labels: studyData.map(day => day.date),
        datasets: [{
            label: 'Matérias Estudadas',
            data: studyData.map(day => day.subjects.length),
            borderColor: '#FE0000',
            backgroundColor: 'rgba(254, 0, 0, 0.2)',
            fill: true,
            tension: 0.3
        }]
    };

    studyChartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const index = tooltipItem.dataIndex;
                            const subjects = studyData[index].subjects;
                            return subjects.length > 0 ? subjects.join(", ") : "Nenhuma matéria";
                        }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: "Dias" } },
                y: { title: { display: true, text: "Qtd. de Matérias" }, beginAtZero: true, stepSize: 1 }
            }
        }
    });
}
createChart()
let barChartInstance;
let doughnutChartInstance;

async function renderCharts() {
    const desempenho = await setLastWeekData();
    console.log(desempenho);

    if (barChartInstance) barChartInstance.destroy();
    if (doughnutChartInstance) doughnutChartInstance.destroy();

    const ctxBar = document.getElementById("studyChart").getContext("2d");
    barChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: desempenho.materias,
            datasets: [{
                label: 'Tópicos Estudados',
                data: desempenho.topicosPorMateria,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Tópicos Estudados por Matéria na Semana' }
            }
        }
    });

    const ctxDoughnut = document.getElementById("questionsChart").getContext("2d");
    doughnutChartInstance = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [
                    desempenho.questoesCorretas, 
                    desempenho.questoesTotais - desempenho.questoesCorretas
                ],
                backgroundColor: ['#4CAF50', '#F44336']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Desempenho em Questões na Semana' }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', renderCharts);
setCronograma()
setReview()

const btnLigar = document.querySelector('#btnLigar');
const btnPausar = document.querySelector('#btnPausar');
const btnResetar = document.querySelector('#btnResetar');
const cronometro = document.querySelector('#cronometro');

let contando = false;
let inicio, pausa = 0, idContagem;

function mostraCronometro() {
    if (!contando) return;
    
    let tempoAtual = performance.now() - inicio + pausa;
    
    let ms = Math.floor((tempoAtual % 1000) / 100); 
    let seg = Math.floor((tempoAtual / 1000) % 60);
    let min = Math.floor((tempoAtual / (1000 * 60)) % 60);
    let hora = Math.floor((tempoAtual / (1000 * 60 * 60)));

    cronometro.innerHTML = 
        `${hora.toString().padStart(2, '0')}:` +
        `${min.toString().padStart(2, '0')}:` +
        `${seg.toString().padStart(2, '0')}.${ms}`;
    
    idContagem = requestAnimationFrame(mostraCronometro);
}

btnLigar.addEventListener('click', () => {
    if (contando) return;
    contando = true;
    inicio = performance.now();
    mostraCronometro();
});

btnPausar.addEventListener('click', () => {
    if (contando) {
        contando = false;
        pausa += performance.now() - inicio;
        cancelAnimationFrame(idContagem);
        btnPausar.innerText = 'Retomar Cronômetro';
    } else {
        contando = true;
        inicio = performance.now();
        mostraCronometro();
        btnPausar.innerText = 'Pausar Cronômetro';
    }
});

btnResetar.addEventListener('click', () => {
    contando = false;
    pausa = 0;
    cancelAnimationFrame(idContagem);
    cronometro.innerHTML = '00:00:00.0';
});