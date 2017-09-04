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

        prepareAvisosList(avisoItems);
        prepareTarefasList(tarefaItems);
        prepareDocumentosList(documentoItems);
        prepareProgressoTotalDoProjetoList(progressoTotalDoProjetoItems);
        prepareProgressoDetalhadoDoProjetoList(progressoDetalhadoDoProjetoItems);

        $('#s4-titlerow').css('display', 'none');
    }

    // This function is executed if the above call fails
    function onGetListsFail(sender, args) {
        alert('Erro:' + args.get_message());
    }
}

