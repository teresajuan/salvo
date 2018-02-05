

$.getJSON(relatedUrl("gp"), function(json) {
    var data = json;
    console.log(data);
    printGrid();
    printShips(data);
    usersTitle(data);
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

function printGrid(){

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
                '<td id=' + rowsTitle1 + columnsTitle[1] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[2] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[3] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[4] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[5] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[6] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[7] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[8] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[9] + " " + 'class="column">' + emptyCell + '</td>' +
                '<td id=' + rowsTitle1 + columnsTitle[10] + " " + 'class="column">' + emptyCell + '</td>' +
                '</tr>';
        }

        $("#salvoTBody").html(row);

    }

    printGamePlayerGrid1.append(tableHead);
}

function printShips (data) {

    var ships = data.ships;

    for (var j = 0; j<ships.length; j++) {

        var shipsLoc = ships[j].locations;

        for (var i = 0; i<shipsLoc.length; i++) {

            var shipsLocations = shipsLoc[i];

            $('td').each(function(){
                var cellId = $(this).attr('id');
                if(cellId === shipsLocations){
                    $(this).css('background-color', 'palegreen');
                }
            })

        }

    }
}

function usersTitle(data) {

    for (var i = 0; i < data.gamePlayer.length; i++) {

        var gpId = data.gamePlayer[i].id;
        var emailUser = data.gamePlayer[i].player.email;
        var gpIdUrl = getParameterByName('gp');

        if (gpId == gpIdUrl) {
            $('#userViewer').html(emailUser);
        } else {
            $('#userPlayer').html(emailUser);
        }
    }
}




