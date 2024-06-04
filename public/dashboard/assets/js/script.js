fetch("../usuario/listarTipo", {
    method: "GET",
}).then(function(resposta){
    console.log(resposta)
    resposta.json().then(listaUsuariosTipo =>{
        listaUsuariosTipo.forEach(usuario =>{
            showChartsType(usuario.programador, usuario.modelador, usuario.designer, usuario.musico);
        })
    })
})


fetch("../pub/periodo", {
    method: "GET",
}).then(function(resposta){
    resposta.json().then(listaPubsPeriodo =>{
        listaPubsPeriodo.forEach(pub =>{
            showPubsTime(pub.total, pub.semana, pub.mes, pub.dia)
        })
    })
})

//nomeCollab
//totalCurtidas
function requisitionPopular(){
    fetch("../collab/popular", {
        method: "GET"
    }).then(function(resposta){
        resposta.json().then(listaCollabsAlta =>{
            console.log(listaCollabsAlta)
            showCollabsPopular(listaCollabsAlta)
        })
    })    
}

setInterval(requisitionPopular, 10000);
     
function showCollabsPopular(collabs) {
    if (lineChart) {
        collabs.forEach((collab, index) => {
            if (lineChart.data.datasets[index]) {
                
                // Adicionar novos dados ao dataset existente
                lineChart.data.datasets[index].data.push(collab.totalCurtidas);

                // Verificar e remover o primeiro valor se exceder 7 valores
                if (lineChart.data.datasets[index].data.length > 7) {
                    lineChart.data.datasets[index].data.shift();
                }
            } else {
                const newDataset = {
                    label: collab.nomeCollab,
                    data: [collab.totalCurtidas],
                    fill: false,
                    borderColor: getColorByIndex(index),
                    tension: 0.1
                };
                lineChart.data.labels.push(collab.momento);
                lineChart.data.datasets.push(newDataset);
            }
        });

        // Atualizar as labels para garantir que todas tenham o mesmo comprimento
        if (lineChart.data.labels.length > 7) {
            lineChart.data.labels.shift();
        }
        lineChart.update();
    }
}


function getColorByIndex(index){
    const colors = [
        'rgb(129, 166, 135)',
        'rgb(41, 55, 64)',
        'rgb(255,255,255)',
        'rgb(151,211,207)'
    ]
    return colors[index % colors.length]
}

const ctx = document.getElementById('line-chart').getContext('2d');
ctx.width = 400;
ctx.heigth = 400;
const data = {
    labels: [],
    datasets: []
};
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Collabs mais curtidas'
        }
    }
};
const lineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});

var dataType = [0,0,0,0];
function showChartsType(programador, modelador, designer, musico){
    devPointer.innerHTML = programador;
    musicPointer.innerHTML = musico;
    designerPointer.innerHTML = designer;
    modeladorPointer.innerHTML = modelador;

    dataType[0] = programador;
    dataType[1] = modelador;
    dataType[2] = designer
    dataType[3] = musico

    console.log(dataType)

    if (doughnutChart) {
        doughnutChart.data.datasets[0].data = dataType;
        doughnutChart.update();
    }
}

const doughnutData = {
    datasets: [{
        label: 'Dataset 1',
        data: dataType,
        borderColor: 'transparent',
        backgroundColor: [
            'rgb(41, 55, 64)',
            'rgb(129, 166, 135)',
            'rgb(255,255,255)',
            'rgb(151,211,207)',
        ],
    }]
};

const doughnutOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Porcentagens das funções'
        }
    }
};

const doughnutChart = new Chart(document.getElementById('doughnut-chart'), {
    type: 'doughnut',
    data: doughnutData,
    options: doughnutOptions
});


// Inicializar array dataTimePub com valores padrão
var dataTimePub = [0, 0, 0, 0];

function showPubsTime(total, semana, mes, dia) {
    dataTimePub[0] = total;
    dataTimePub[1] = semana;
    dataTimePub[2] = mes;
    dataTimePub[3] = dia;

    console.log("PUBS", dataTimePub);

    if (barChart) {
        barChart.data.datasets[0].data = [dataTimePub[0]];
        barChart.data.datasets[1].data = [dataTimePub[2]];
        barChart.data.datasets[2].data = [dataTimePub[1]];
        barChart.data.datasets[3].data = [dataTimePub[3]];
        barChart.update();
    }
}

const barData = {
    labels: ['Publicações'],
    datasets: [{
        label: 'Total',
        backgroundColor: 'rgb(129, 166, 135)',
        borderColor: 'rgb(129, 166, 135)',
        data: [dataTimePub[0]],
        borderWidth: 1
    }, {
        label: 'Mês',
        backgroundColor: 'rgb(41, 55, 64)',
        borderColor: 'rgb(41, 55, 64)',
        data: [dataTimePub[2]],
        borderWidth: 1
    }, {
        label: 'Semana',
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(255, 255, 255)',
        data: [dataTimePub[1]],
        borderWidth: 1
    }, {
        label: 'Dia',
        backgroundColor: 'rgb(151, 211, 207)',
        borderColor: 'rgb(151, 211, 207)',
        data: [dataTimePub[3]],
        borderWidth: 1
    }]
};

const barOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Publicações'
        }
    }
};

const barChart = new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: barData,
    options: barOptions
});

