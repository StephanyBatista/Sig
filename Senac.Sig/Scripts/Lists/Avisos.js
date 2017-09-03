'use strict';

var avisosStoreds = [];

function prepareAvisosList(avisoItems) {

    var items = avisoItems.getEnumerator();

    while (items.moveNext()) {

        var item = items.get_current();

        var id = item.get_item('ID');
        var title = item.get_item('Title');
        var body = item.get_item('Body');
        var listRef = item.get_item('FileDirRef');
        var url = listRef + '/DispForm.aspx?ID=' + id;

        avisosStoreds.push({ id: id, title: title, body: body, listRef: listRef, url: url });
    }

    populateAvisos(true);
}

function populateAvisos(onlyThree) {

    var itemMaxNumber = 3;
    for (var index = avisosStoreds.length - 1; index >= 0; index--) {

        if (itemMaxNumber === 0 && onlyThree) {

            $('#verMais').removeClass('hidden');
            break;
        }
        else
            $('#verMais').addClass('hidden');

        $('#noticiasDiv')
            .append(
                '<a href="' + avisosStoreds[index].url + '" class="list-group-item">' +
                '<h4 class="list-group-item-heading"><strong>' + avisosStoreds[index].title + '</strong></h4>' +
                '<p class="list-group-item-text">' + avisosStoreds[index].body + '</p>' +
                '</a>');

        avisosStoreds.splice(index, 1);
        itemMaxNumber--;
    }
}