'use strict';

var tarefaList,    
    tarefaItems,
    documentoList,
    documentoItems,
    avisoList,
    avisoItems,
    progressoTotalDoProjetoList,
    progressoTotalDoProjetoItems,
    progressoDetalhadoDoProjetoList,
    progressoDetalhadoDoProjetoItems,
    appweburl,
    hostweburl,
    context,
    appContextSite;

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    JSRequest.EnsureSetup();
    appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
    hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);

    var context = new SP.ClientContext();
    var site = new SP.AppContextSite(context, hostweburl);
    var web = site.get_web();

    var query = SP.CamlQuery.createAllItemsQuery();
    query.set_folderServerRelativeUrl('Documentos/');
    tarefaList = web.get_lists().getByTitle("Diário de Bordo");
    tarefaItems = tarefaList.getItems(query);
    documentoList = web.get_lists().getByTitle("Documentos");
    documentoItems = documentoList.getItems(query);
    avisoList = web.get_lists().getByTitle("Avisos");
    avisoItems = avisoList.getItems(query);
    progressoTotalDoProjetoList = web.get_lists().getByTitle("Progresso Total do Projeto");
    progressoTotalDoProjetoItems = progressoTotalDoProjetoList.getItems(query);
    progressoDetalhadoDoProjetoList = web.get_lists().getByTitle("Progresso Detalhado do Projeto");
    progressoDetalhadoDoProjetoItems = progressoDetalhadoDoProjetoList.getItems(query);

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {

        Chart.defaults.global.defaultFontColor = "#fff";

        loadLists();
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function loadLists() {
        
        context.load(tarefaList);
        context.load(tarefaItems);
        context.load(avisoList);
        context.load(avisoItems);
        context.load(documentoList);
        context.load(documentoItems, 'Include(Title, ContentType, File)');
        context.load(progressoTotalDoProjetoList);
        context.load(progressoTotalDoProjetoItems);
        context.load(progressoDetalhadoDoProjetoList);
        context.load(progressoDetalhadoDoProjetoItems);
        context.executeQueryAsync(onGetListsSuccess, onGetListsFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetListsSuccess() {

        prepareAvisosList();
        prepareTarefasList();
        prepareDocumentosList();
        prepareProgressoTotalDoProjetoList();
        prepareProgressoDetalhadoDoProjetoList();

        $('#s4-titlerow').css('display', 'none');
    }

    function prepareAvisosList() {

        var items = avisoItems.getEnumerator();
        var itemStoreds = [];

        while (items.moveNext()) {

            var item = items.get_current();

            var id = item.get_item('ID');
            var title = item.get_item('Title');
            var body = item.get_item('Body');
            var listRef = item.get_item('FileDirRef');
            var url = listRef + '/DispForm.aspx?ID=' + id;

            itemStoreds.push({ id: id, title: title, body: body, listRef: listRef, url: url });
        }

        var itemMaxNumber = 3;
        for (var i = itemStoreds.length - 1; i >= 0; i--) {

            if (itemMaxNumber === 0)
                break;

            $('#noticiasDiv')
                .append(
                '<a href="' + itemStoreds[i].url + '" class="list-group-item">' +
                '<h4 class="list-group-item-heading"><strong>' + itemStoreds[i].title + '</strong></h4>' +
                '<p class="list-group-item-text">' + itemStoreds[i].body + '</p>' +
                '</a>');

            itemMaxNumber--;
        }
    }

    function prepareTarefasList() {

        var items = tarefaItems.getEnumerator();

        while (items.moveNext()) {
            var item = items.get_current();

            var id = item.get_item('ID');
            var listRef = item.get_item('FileDirRef');
            var url = listRef + '/DispForm.aspx?ID=' + id; 
            var title = item.get_item('Title');
            var percentComplete = item.get_item('PercentComplete');
            var status = item.get_item('Status');
            var assignedTo = item.get_item('AssignedTo');
            var startDate = item.get_item('StartDate');
            var startDateFormatted = startDate != null ? startDate.format('dd/MM/yyyy') : '';
            var dueDate = item.get_item('DueDate');
            var dueDateFormatted = dueDate != null ? dueDate.format('dd/MM/yyyy') : '';

            $('#projetosTable tr:last')
                .after('<tr>' +
                    '<td>' + id + '</td>' +
                    '<td><a href="'+url+'">' + title + '</a></td>' +
                    '<td>' + percentComplete + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + assignedTo[0].get_lookupValue() + '</td>' +
                    '<td>' + startDateFormatted + '</td>' +
                    '<td>' + dueDateFormatted + '</td>' +
                    '</tr >');
        }
    }

    function prepareDocumentosList() {

        var items = documentoItems.getEnumerator();

        while (items.moveNext()) {
            var item = items.get_current();

            var title = item.get_file().get_name();
            var file = item.get_file().get_linkingUrl();

            $('#documentosTable tr:last')
                .after('<tr>' +
                '<td><a href="' + file + '">' + title + '</a></td>' +
                '<td></td>' +
                '</tr >');
            
        }
    }

    function prepareProgressoTotalDoProjetoList() {

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

    function prepareProgressoDetalhadoDoProjetoList() {

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

    // This function is executed if the above call fails
    function onGetListsFail(sender, args) {
        alert('Erro:' + args.get_message());
    }
}