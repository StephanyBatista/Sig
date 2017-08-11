'use strict';

var tarefaList, documentoList, tarefaItems, documentoItems, appweburl, hostweburl, context, appContextSite;

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

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        loadLists();
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function loadLists() {
        //context.load(user);
        context.load(tarefaList);
        context.load(tarefaItems);
        context.load(documentoList);
        context.load(documentoItems, 'Include(Title, ContentType, File)');
        context.executeQueryAsync(onGetListsSuccess, onGetListsFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetListsSuccess() {

        prepareTarefasList();
        prepareDocumentosList();
    }

    function prepareTarefasList() {

        var items = tarefaItems.getEnumerator();

        while (items.moveNext()) {
            var item = items.get_current();

            var id = item.get_item('ID');
            var title = item.get_item('Title');
            var percentComplete = item.get_item('PercentComplete');
            var status = item.get_item('Status');
            var assignedTo = item.get_item('AssignedTo');
            var startDate = item.get_item('StartDate');
            var dueDate = item.get_item('DueDate');

            console.log(title);
            $('#projetosTable tr:last')
                .after('<tr>' +
                    '<td>' + id + '</td>' +
                    '<td>' + title + '</td>' +
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

            var id = item.get_item('ID');
            var name = item.get_item('FileLeafRef');
            var title = item.get_item('Title');
            var file = item.get_file();

            console.log(title);
            
        }
    }

    // This function is executed if the above call fails
    function onGetListsFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}