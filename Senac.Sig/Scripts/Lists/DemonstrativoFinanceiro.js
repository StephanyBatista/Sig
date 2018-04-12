'use strict';

function prepareDemonstrativoFinanceiroList(demonstrativoFinanceiroItems) {

    var items = demonstrativoFinanceiroItems.getEnumerator();
    var labels = [];
    var listaDeTotal = [];
    var listaDoDn = [];
    var listaDoDr = [];
    var previsto2018;
    var totalDoDemonstrativoFinanceiro = 0;
    var totalDoDnDoDemonostrativoFinanceiro = 0;
    var totalDoDrDoDemonostrativoFinanceiro = 0;
    
    while (items.moveNext()) {
        var item = items.get_current();
        var nome = item.get_item('Title');
        if (nome === "Previsto 2018") {
            previsto2018 = item.get_item('y6y4');
            continue;
        }
        if (nome === "Realizado 2018:" || nome === "Acumulado 2018")
            continue;

        labels.push(nome);

        const total = item.get_item('y6y4');
        listaDeTotal.push(validarERemoverFormatoDeDinheiro(total));
        totalDoDemonstrativoFinanceiro += parseFloat(validarERemoverFormatoDeDinheiro(total));

        const dn = item.get_item('dp7r');
        listaDoDn.push(validarERemoverFormatoDeDinheiro(dn));
        totalDoDnDoDemonostrativoFinanceiro += parseFloat(validarERemoverFormatoDeDinheiro(dn));

        const dr = item.get_item('yx4a');
        listaDoDr.push(validarERemoverFormatoDeDinheiro(dr));
        totalDoDrDoDemonostrativoFinanceiro += parseFloat(validarERemoverFormatoDeDinheiro(dr));
    }

    $('#totalDF').text(totalDoDemonstrativoFinanceiro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
    $('#dnDF').text(totalDoDnDoDemonostrativoFinanceiro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
    $('#drDF').text(totalDoDrDoDemonostrativoFinanceiro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));

    function validarERemoverFormatoDeDinheiro(valor) {
        return valor ? valor.replace('R$', '').replace('.', '').replace('.', '').replace(',', '.') : 0;
    }

    var barData = {
        labels: labels,
        datasets: [{
            label: 'Total',
            backgroundColor: 'rgb(51, 153, 255)',
            data: listaDeTotal
        }, {
            label: 'DN (60%)',
            backgroundColor: 'rgb(255, 215, 0)',
            data: listaDoDn
        }, {
            label: 'DRs (40%)',
            backgroundColor: 'rgb(255, 120, 0)',
            data: listaDoDr
        }]
    };

    var ctx = document.getElementById("demonstrativoFinanceiro");
    new Chart(ctx, {
        type: 'horizontalBar',
        data: barData,
        options: {
            plugins: {
                datalabels: {
                    color: 'white',
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] > 15;
                    },
                    font: {
                        weight: 'bold'
                    },
                    formatter: Math.round
                }
            },
            title: {
                display: true,
                text: 'Previsto 2018: ' + previsto2018
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItems, data) {
                        return tooltipItems.xLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                    }
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                        }
                    }
                }]
            },
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
            }
        }
    });
}

