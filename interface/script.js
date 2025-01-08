function round(numero, casasDecimais) {
    casasDecimais = typeof casasDecimais !== 'undefined' ?  casasDecimais : 2;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
};

async function fetchData() {
    const response = await fetch('http://127.0.0.1:3000/data');
    const data = await response.json();
    return data;
}

async function fetchCronograma() {
    const response = await fetch('http://127.0.0.1:3000/cronograma');
    const data = await response.json();
    return data;
}

function getDiaDaSemana() {
    const diasDaSemana = [
      "domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"
    ];
  
    const hoje = new Date();
    const dia = hoje.getDay();   
    return diasDaSemana[dia];
}

async function escolherCronograma() {
    const cronograma = await fetchCronograma(); 
    const diaHoje = getDiaDaSemana(); 
    return cronograma[diaHoje];
}

async function buscarPrimeiroTopicNaoConcluido(materia) {
    const response = await fetch('http://127.0.0.1:3000/data');
    const subjectData = await response.json();
    const ttopic = subjectData.find(e => e.subject == materia)
    if (!ttopic) {
        document.getElementById("aviso").innerText = `Disciplina "${materia}" não encontrada!`;
        setTimeout(() => {
            document.getElementById("aviso").innerText = "";
        }, 2000);
        return;  
    }
    const topic = ttopic.topics.find(topic => topic.concluido === false)
    return topic;
}

async function atualizarTopico(topicId, materia, topicData) {
    const resposta = await fetch('http://127.0.0.1:3000/update-topic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topicId,  // ID do tópico (identificador único)
            materia,  // A matéria (se necessário para buscar)
            updates: {
                concluido: true,
                // Adicione outros dados a serem atualizados aqui
                ...topicData // Exemplo: talvez o campo 'rating', 'dificuldade' etc.
            }
        })
    });
    const dados = await resposta.json();
    return dados;
}

async function setCronograma() {
    const materias = await escolherCronograma();  // Agora "materias" será o valor do cronograma do dia
    const tbody = document.getElementById('tbodytoday');

    if (Array.isArray(materias)) {  // Verificando se "materias" é um array
        for (let materia of materias) {
            const topic = await buscarPrimeiroTopicNaoConcluido(materia); // Aguarda o retorno do primeiro tópico não concluído

            if (topic) {
                const novaLinha = document.createElement('tr');
                novaLinha.id = topic._id

                const celula1 = document.createElement('td');
                celula1.textContent = materia;
                novaLinha.appendChild(celula1);

                const celula2 = document.createElement('td');
                celula2.textContent = topic.assunto;
                novaLinha.appendChild(celula2);

                const celula3 = document.createElement('td');
                celula3.textContent = topic.volume;
                novaLinha.appendChild(celula3);

                const celula4 = document.createElement('td');
                celula4.textContent = topic.frente;
                novaLinha.appendChild(celula4);

                const celula5 = document.createElement('td');
                celula5.textContent = topic.pinicial;
                novaLinha.appendChild(celula5);

                const celula6 = document.createElement('td');
                celula6.textContent = topic.prop;
                novaLinha.appendChild(celula6);

                const celula7 = document.createElement('td');
                const inputfeitas = document.createElement("input");
                inputfeitas.type = "number";
                inputfeitas.id = "feitas"
                celula7.appendChild(inputfeitas)
                novaLinha.appendChild(celula7);

                const celula8 = document.createElement('td');
                const inputcorretas = document.createElement("input");
                inputcorretas.type = "number";
                inputcorretas.id = "corretas"
                celula8.appendChild(inputcorretas)
                novaLinha.appendChild(celula8);

                const celula9 = document.createElement('td');
                const inpdifficinput = document.createElement("input");
                inpdifficinput.type = "number";  // Tipo de entrada numérica
                inpdifficinput.min = 0;         // Valor mínimo
                inpdifficinput.max = 5;         // Valor máximo
                inpdifficinput.step = 1;        // Incremento de 1
                inpdifficinput.id = "rating";   // Definir ID
                inpdifficinput.name = "rating"; // Definir nome
                celula9.appendChild(inpdifficinput);
                novaLinha.appendChild(celula9);

                const celula10 = document.createElement('td');
                const botaoEstudar = document.createElement('button');
                botaoEstudar.textContent = 'Estudar';
                botaoEstudar.addEventListener('click', async () => {
                    await atualizarTopico(topic._id, materia, { difficult: inpdifficinput.value, rate: round(inputcorretas.value/inputfeitas.value, 3) });
                    alert('Matéria concluída!'); 
                });
                celula10.appendChild(botaoEstudar); // Botão
                novaLinha.appendChild(celula10);

                // Adiciona a nova linha ao tbody
                tbody.appendChild(novaLinha);
            }
        }
    } else {
        console.error("O cronograma para hoje não é um array válido.");
    }
}

setCronograma();

fetchData();
fetchCronograma();
