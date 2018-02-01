

$.getJSON(relatedUrl("gp"), function(json) {
    var data = json;
    console.log(data);

});

/*funciones para devolver el api correspondiente en función del gp seleccionado*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function relatedUrl (locationData) {

    return "http://localhost:8080/api/game_view/" + getParameterByName(locationData);

}

/*creacion del grid*/

    var columnsTitle = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    var rowsTitle = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var printGamePlayerGrid1 = document.getElementById('salvoTHead');

    var tableHead = document.createElement('tr');

    for(var i = 0; i < columnsTitle.length; i++){

        var columnsTitle1 = columnsTitle[i];

        var rowTitle2 = document.createElement('th');

        rowTitle2.setAttribute('scope', 'col');

        rowTitle2.append(columnsTitle1);
        tableHead.append(rowTitle2);

        var row = "";
        for(var j = 0; j<rowsTitle.length; j++) {
            var rowsTitle1 = rowsTitle[j];
            var emptyCell = "";

            row += '<tr>' +
                '<td class="letters">' + rowsTitle1 + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td class="column">' + emptyCell + '</td>' +
                '<td>' + emptyCell + '</td>' +
                '</tr>';
        }

        $("#salvoTBody").html(row);


    }

    printGamePlayerGrid1.append(tableHead);











