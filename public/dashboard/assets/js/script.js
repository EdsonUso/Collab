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





const ctx = document.getElementById('line-chart').getContext('2d');
ctx.width = 400;
ctx.heigth = 400;
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Collab 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(129, 166, 135)',
        tension: 0.1
    },
    {
        label: 'Collab 2',
        data: [10, 20, 14, 23, 44, 32, 67],
        fill: false,
        borderColor: 'rgba(255,255,255)',
        tension: 0.1
    },

    ]
};
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart'
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
            'rgb(129, 166, 135)',
            'rgb(41, 55, 64)',
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
            text: 'Chart.js Doughnut Chart'
        }
    }
};

const doughnutChart = new Chart(document.getElementById('doughnut-chart'), {
    type: 'doughnut',
    data: doughnutData,
    options: doughnutOptions
});


const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Total',
        backgroundColor: 'rgb(129, 166, 135)',
        borderColor: 'rgb(129, 166, 135)',
        data: [65],
        borderWidth: 1
    }, {
        label: 'Mês',
        backgroundColor: 'rgb(41, 55, 64)',
        borderColor: 'rgb(41, 55, 64)',
        data: [35],
        borderWidth: 1
    },
    {
        label: 'semana',
        backgroundColor: 'rgb(255,255,255)',
        data: [44],
        borderWidth: 1
    },
    {
        label: 'Dia',
        backgroundColor: 'rgb(151,211,207)',
        data: [55],
        borderWidth: 1
    }

    ]
};

const barOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart'
        }
    }
};

const barChart = new Chart(document.getElementById('bar-chart'), {
    type: 'bar',
    data: barData,
    options: barOptions
});

