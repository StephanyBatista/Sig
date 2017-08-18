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
    tarefaList = web.get_lists().getByTitle("Tarefas");
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

        while (items.moveNext()) {
            var item = items.get_current();

            var id = item.get_item('ID');
            var title = item.get_item('Title');
            var body = item.get_item('Body');
            var listRef = item.get_item('FileDirRef');
            var url = listRef + '/DispForm.aspx?ID=' + id; 

            $('#noticiasDiv')
                .append(
                '<a href="' + url + '" class="list-group-item">'+
                '<h4 class="list-group-item-heading"><strong>' + title + '</strong></h4>'+
                '<p class="list-group-item-text">' + body + '</p>'+
                '</a>');
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
            var dueDate = item.get_item('DueDate');

            $('#projetosTable tr:last')
                .after('<tr>' +
                    '<td>' + id + '</td>' +
                    '<td><a href="'+url+'">' + title + '</a></td>' +
                    '<td>' + percentComplete + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + assignedTo[0].get_lookupValue() + '</td>' +
                    '<td>' + startDate.format('dd/MM/yyyy') + '</td>' +
                    '<td>' + dueDate.format('dd/MM/yyyy') + '</td>' +
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
            data.push(item.get_item('_x0062_ht7'));
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
                        'rgba(51, 153, 255, 0.4)',
                        'rgba(0, 204, 0, 0.4)',
                        'rgba(255, 51, 153, 0.4)',
                        'rgba(153, 153, 255, 0.4)',
                        'rgba(255, 255, 153, 0.4)',
                        'rgba(255, 102, 102, 0.4)'
                    ]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Progresso Total do Projeto'
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
                backgroundColor: 'rgba(51, 153, 255, 0.4)',
                data: trabalhosEstimadosData
            }, {
                label: 'Trabalho Realizado',
                backgroundColor: 'rgba(0, 204, 0, 0.4)',
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
                },
                title: {
                    display: true,
                    text: 'Progresso Detalhado do Projeto'
                }
            }
        });
    }

    // This function is executed if the above call fails
    function onGetListsFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}