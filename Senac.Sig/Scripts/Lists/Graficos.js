'use strict';

function prepareProgressoTotalDoProjetoList(progressoTotalDoProjetoItems) {

    var items = progressoTotalDoProjetoItems.getEnumerator();
    var labels = [];
    var data = [];

    while (items.moveNext()) {
        var item = items.get_current();

        var titulo = item.get_item('Title') + ': ' + item.get_item('Qtd');
        labels.push(titulo);
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
    var horasOrdered = [];
    

    while (items.moveNext()) {
        var item = items.get_current();

        labels.push(item.get_item('Data').format('MM/yyyy'));
        var horaRealizada = item.get_item('Horas_x0020_Realizadas');
        var horaPrevista = item.get_item('Horas_x0020_Previstas');
        
        horasRealizadas.push(horaRealizada);
        horasPrevistas.push(horaPrevista);

        if (horaRealizada)
            horasOrdered.push(horaRealizada);
        if (horaPrevista)
            horasOrdered.push(horaPrevista);
    }

    horasOrdered.sort();
    var maxValue = horasOrdered[0]; 
    var minValue = horasOrdered[horasOrdered.length - 1];


    var barData = {
        labels: labels,
        datasets: [{
            label: 'Horas Realizadas',
            borderColor: 'rgb(51, 153, 255)',
            backgroundColor: 'rgb(51, 153, 255)',
            data: horasRealizadas,
            fill: false
        }, {
            label: 'Horas Previstas',
            backgroundColor: 'rgb(255, 215, 0)',
            borderColor: 'rgb(255, 215, 0)',
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
                text: 'Evolução do Projeto'
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
                        labelString: 'Mês'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Horas'
                    }
                }]
            }
        }
    });
}