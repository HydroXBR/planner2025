function round(numero, casasDecimais) {
    casasDecimais = typeof casasDecimais !== 'undefined' ? casasDecimais : 2;
    return +(Math.floor(numero + ('e+' + casasDecimais)) + ('e-' + casasDecimais));
}

async function fetchStudyData() {
    const response = await fetch('http://127.0.0.1:3000/data');
    return await response.json();
}

async function fetchCronograma() {
    const response = await fetch('http://127.0.0.1:3000/cronograma');
    return await response.json();
}

function formatDate(date) {
    return date.toLocaleDateString('pt-BR');
}

function getDia(numm) {
    const diasDaSemana = [
        "domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"
    ];
    return diasDaSemana[numm];
}

async function buscarPrimeiroTopicNaoConcluido(materia) {
    const response = await fetch('http://127.0.0.1:3000/data');
    const subjectData = await response.json();
    const ttopic = subjectData.find(e => e.subject === materia);

    if (!ttopic) {
        document.getElementById("aviso").innerText = `Disciplina "${materia}" não encontrada!`;
        setTimeout(() => {
            document.getElementById("aviso").innerText = "";
        }, 2000);
        return;  
    }
    return ttopic.topics.find(topic => topic.concluido === false);
}

async function atualizarTopico(topicId, materia, topicData) {
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
                ...topicData
            }
        })
    });
    return await resposta.json();
}

let addZero = num => num < 10 ? "0" + num : num

function table(date){
    let newdiv = document.createElement("div");
    newdiv.id = "div-" + addZero(date.getDate()) + addZero(date.getMonth() + 1) + date.getFullYear();
    let h3 = document.createElement("h3");
    h3.id = "h3-" + addZero(date.getDate()) + addZero(date.getMonth() + 1) + date.getFullYear();
    h3.innerText = addZero(date.getDate()) + `/` + addZero(date.getMonth() + 1) + `/` + date.getFullYear();
    let newtb = document.createElement("table");
    newtb.id = "table-" + addZero(date.getDate()) + addZero(date.getMonth() + 1) + date.getFullYear();

    newdiv.appendChild(h3)
    newdiv.appendChild(newtb)

    let thead = document.createElement("thead")
    let linhap = document.createElement("tr")
    let divs = ["Disciplina", "Conteúdo", "Volume", "Frente", "Página Inicial", "Página Final", "Exercícios"]
    for(var i = 0; i < divs.length; i++){
        let newtr = document.createElement("th")
        newtr.innerHTML = divs[i]
        linhap.appendChild(newtr)
    }
    thead.appendChild(linhap)
    newtb.appendChild(thead)
    newtb.appendChild(document.createElement("tbody"))

    return newdiv
}

function line(table, disciplina, assunto, volume, frente, pagina, paginafinal, exercicios) {
    let arr = [disciplina, assunto, volume, frente, pagina, paginafinal, exercicios];
    
    let tbody = table.querySelector("tbody"); 
    
    if (!tbody) {
        console.error("Erro: tbody não encontrado na tabela!");
        return;
    }
    
    let newline = document.createElement("tr");
    for (var i = 0; i < arr.length; i++) {
        let thp = document.createElement("td");
        thp.innerText = arr[i];
        newline.appendChild(thp);
    }

    tbody.appendChild(newline);
}

function linetext(table, text) {
    let tbody = table.querySelector("tbody");
    
    if (!tbody) {
        console.error("Erro: tbody não encontrado na tabela!");
        return;
    }

    let mergedRow = document.createElement("tr");
    let mergedCell = document.createElement("td");

    mergedCell.colSpan = 6; // Mescla 6 colunas
    mergedCell.innerText = text;
    mergedCell.style.textAlign = "center"; // Centraliza o texto (opcional)
    mergedCell.style.fontWeight = "bold"; // Deixa o texto em negrito (opcional)

    mergedRow.appendChild(mergedCell);
    tbody.appendChild(mergedRow);
}

async function loadSchedule() {
    try {
        const weeklySchedule = await fetchCronograma();
        const allData = await fetchStudyData();

        let arrdisc =  [
            {sub: "Biologia", avtopics: allData.find(item => item.subject == "Biologia").topics.filter(item => !item.concluido)},
            {sub: "História", avtopics: allData.find(item => item.subject == "História")?.topics.filter(item => !item.concluido)},
            {sub: "Geografia", avtopics: allData.find(item => item.subject == "Geografia")?.topics.filter(item => !item.concluido)},
            {sub: "Física", avtopics: allData.find(item => item.subject == "Física").topics.filter(item => !item.concluido)},
            {sub: "Português", avtopics: allData.find(item => item.subject == "Português")?.topics.filter(item => !item.concluido)},
            {sub: "Matemática", avtopics: allData.find(item => item.subject == "Matemática")?.topics.filter(item => !item.concluido)},
            {sub: "Química", avtopics: allData.find(item => item.subject == "Química")?.topics.filter(item => !item.concluido)},
            {sub: "Filosofia", avtopics: allData.find(item => item.subject == "Filosofia")?.topics.filter(item => !item.concluido)},
            {sub: "Sociologia", avtopics: allData.find(item => item.subject == "Sociologia")?.topics.filter(item => !item.concluido)}
        ]
    

        const today = new Date();
        const endDate = new Date('2025-11-30');

        let availableTopics = allData.filter(item => !item.concluido);
        let currentDate = new Date(today);

        while (currentDate <= endDate) {
            let stdiv = document.getElementById("scheduleList")
            let tabletoday = table(currentDate)
            let disciplinashoje = weeklySchedule[getDia(currentDate.getDay())]

            if(getDia(currentDate.getDay()) == "domingo"){

            }else{
                disciplinashoje.forEach(disc => {
                    let discipline = arrdisc.find(e => e.sub == disc)
                    let topic = discipline.avtopics?.filter(e => !e.concluido)[0]
                    if(!topic){
                        linetext(tabletoday.childNodes[1], `Não há mais tópicos para ${disc}.`)
                    }else{
                        line(tabletoday.childNodes[1], disc, topic.assunto, topic.volume, topic.frente, topic.pinicial, topic.pfinal, topic.prop)
                        arrdisc.find(e => e.sub == disc).avtopics.shift()
                    }
                })

                stdiv.appendChild(tabletoday)
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    } catch (error) {
        console.error('Erro ao carregar cronograma:', error);
    }
}

// Carrega ao iniciar a página
document.addEventListener('DOMContentLoaded', loadSchedule);
