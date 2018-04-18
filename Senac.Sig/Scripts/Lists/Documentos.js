'use strict';

function prepareDocumentosList(documentoItems) {

    var items = documentoItems.getEnumerator();

    while (items.moveNext()) {
        var item = items.get_current();

        var title = item.get_file().get_name();
        var file = item.get_file().get_serverRelativeUrl();
        var length = parseInt(parseInt(item.get_file().get_length()) / 1024);

        $('#documentosTable tr:last')
            .after('<tr>' +
                '<td><a href="' + file + '">' + title + '</a></td>' +
                '<td>' + length+' Kb</td>' +
                '</tr >');

    }
}