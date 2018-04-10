'use strict';

function prepareDemonstrativoFinanceiroList(demonstrativoFinanceiroItems) {

    var items = demonstrativoFinanceiroItems.getEnumerator();
    var labels = [];
    var listaDeTotal = [];
    var listaDoDn = [];
    var listaDoDr = [];

    while (items.moveNext()) {
        var item = items.get_current();
        labels.push(item.get_item('Title'));

        const total = item.get_item('y6y4');
        listaDeTotal.push(total ? total.replace('R$', '').replace('.', '').replace('.', '').replace(',', '') : 0);
        const dn = item.get_item('dp7r');
        listaDoDn.push(dn ? dn.replace('R$', '').replace('.', '').replace('.', '').replace(',', '') : 0);
        const dr = item.get_item('yx4a');
        listaDoDr.push(dr ? dr.replace('R$', '').replace('.', '').replace('.', '').replace(',', '') : 0);
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
            tooltips: {
                callbacks: {
                    label: function (tooltipItems, data) {
                        return tooltipItems.xLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
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

