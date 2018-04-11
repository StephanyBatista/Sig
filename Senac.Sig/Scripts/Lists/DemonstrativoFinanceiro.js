'use strict';

function prepareDemonstrativoFinanceiroList(demonstrativoFinanceiroItems) {

    var items = demonstrativoFinanceiroItems.getEnumerator();
    var labels = [];
    var listaDeTotal = [];
    var listaDoDn = [];
    var listaDoDr = [];
    var listaGeral = [];
    var index = 0;
    var previsto2018;

    listaGeral[0] = [];
    listaGeral[1] = [];
    listaGeral[2] = [];
    while (items.moveNext()) {
        var item = items.get_current();
        var nome = item.get_item('Title');
        if (nome === "Previsto 2018") {
            previsto2018 = item.get_item('y6y4');
            continue;
        }
        if (nome === "Realizado 2018:")
            continue;

        labels.push(nome);

        const total = item.get_item('y6y4');
        listaGeral[0][index] = total;
        listaDeTotal.push(total ? total.replace('R$', '').replace(',', '').replace('.', '').replace('.', '') : 0);

        const dn = item.get_item('dp7r');
        listaGeral[1][index] = dn;
        listaDoDn.push(dn ? dn.replace('R$', '').replace(',', '').replace('.', '').replace('.', '') : 0);

        const dr = item.get_item('yx4a');
        listaGeral[2][index] = dr;
        listaDoDr.push(dr ? dr.replace('R$', '').replace(',', '').replace('.', '').replace('.', '') : 0);

        index++;
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
            title: {
                display: true,
                text: 'Previsto 2018: ' + previsto2018
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItems, data) {
                        return listaGeral[tooltipItems.datasetIndex][tooltipItems.index];
                    }
                }
            },
            scales: {
                xAxes: [{
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

