'use strict';

function prepareTarefasList(tarefaItems) {

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
                '<td><a href="' + url + '">' + title + '</a></td>' +
                '<td>' + percentComplete + '</td>' +
                '<td>' + status + '</td>' +
                '<td>' + assignedTo[0].get_lookupValue() + '</td>' +
                '<td>' + startDateFormatted + '</td>' +
                '<td>' + dueDateFormatted + '</td>' +
                '</tr >');
    }
}