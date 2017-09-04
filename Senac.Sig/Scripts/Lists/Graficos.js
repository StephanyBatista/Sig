'use strict';

function prepareProgressoTotalDoProjetoList(progressoTotalDoProjetoItems) {

    var items = progressoTotalDoProjetoItems.getEnumerator();
    var labels = [];
    var data = [];

    while (items.moveNext()) {
        var item = items.get_current();

        labels.push(item.get_item('Title'));
        data.push(item.get_item('Qtd'));
    }

    console.log(labels);
    console.log(data);

    var ctx = document.getElementById("progressoTotalDoProjeto");
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Progresso Total do Projeto',
                data: data,
                backgroundColor: [
                    'rgb(51, 153, 255)',
                    'rgb(255, 215, 0)',
                    'rgb(255,69,0)',
                    'rgb(46,139,87)',
                    'rgb(160,82,45)',
                    'rgb(106,90,205)'
                ]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Progresso Total do Projeto',
                fontColor: '#FFFFFF'
            },
            legend: {
                position: 'right',
                labels: {
                    fontColor: 'white'
                }
            },
            pieceLabel: {
                render: 'value',
                precision: 0,
                showZero: true,
                fontSize: 18,
                fontColor: '#fff',
                fontStyle: 'bold',
                arc: false,
                position: 'outside',
                overlap: true
            }
        }
    });
}

function prepareProgressoDetalhadoDoProjetoList(progressoDetalhadoDoProjetoItems) {

    var items = progressoDetalhadoDoProjetoItems.getEnumerator();
    var labels = [];
    var trabalhosEstimadosData = [];
    var trabalhosRealizadosData = [];

    while (items.moveNext()) {
        var item = items.get_current();

        labels.push(item.get_item('Title'));
        trabalhosEstimadosData.push(item.get_item('Trabalho_x0020_Estimado'));
        trabalhosRealizadosData.push(item.get_item('Trabalho_x0020_Realizado'));
    }

    var barData = {
        labels: labels,
        datasets: [{
            label: 'Trabalho Estimado',
            backgroundColor: 'rgb(51, 153, 255)',
            data: trabalhosEstimadosData
        }, {
            label: 'Trabalho Realizado',
            backgroundColor: 'rgb(255, 215, 0)',
            data: trabalhosRealizadosData
        }]

    };

    var ctx = document.getElementById("progressoDetalhadoDoProjeto");
    new Chart(ctx, {
        type: 'horizontalBar',
        data: barData,
        options: {

            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'right',
                labels: {
                    fontColor: 'white'
                }
            },
            title: {
                display: true,
                text: 'Progresso Detalhado do Projeto',
                fontColor: '#FFFFFF'
            }
        }
    });
}

function prepareEvolucaoDoProjetoList(evolucaoDoProjetoItems) {

    var items = evolucaoDoProjetoItems.getEnumerator();
    var labels = [];
    var horasRealizadas = [];
    var horasPrevistas = [];
    var maxValue = 0;
    var minValue = 999999;

    while (items.moveNext()) {
        var item = items.get_current();

        labels.push(item.get_item('Data').format('MM/yyyy'));
        var horaRealizada = item.get_item('Horas_x0020_Realizadas');
        horasRealizadas.push(horaRealizada);
        var horaPrevista = item.get_item('Horas_x0020_Previstas');
        horasPrevistas.push(horaPrevista);

        if (maxValue < horaRealizada)
            maxValue = horaRealizada;

        if (maxValue < horaPrevista)
            maxValue = horaPrevista;
    }

    var 

    var barData = {
        labels: labels,
        datasets: [{
            label: 'Horas Realizadas',
            backgroundColor: 'rgb(51, 153, 255)',
            data: horasRealizadas,
            fill: false
        }, {
            label: 'Horas Previstas',
            backgroundColor: 'rgb(255, 215, 0)',
            data: horasPrevistas,
            fill: false,
        }]

    };

    var ctx = document.getElementById("evolucaoDoProjeto");
    new Chart(ctx, {
        type: 'line',
        data: barData,
        options: {

            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        min: 0,
                        max: maxValue,

                        // forces step size to be 5 units
                        stepSize: 5
                    }
                }]
            }
        }
    });
}