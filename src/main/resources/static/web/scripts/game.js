

$.getJSON(relatedUrl("gp"), function(json) {
    var data = json;
    console.log(data);
    printGrid("salvoTHead1", "#salvoTBody1");
    printGrid("salvoTHead2", "#salvoTBody2");
    printShips(data);
    printSalvos(data);
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

function printGrid(elementTHead, elementTBody){

    var columnsTitle = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    var rowsTitle = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var printGamePlayerGrid1 = document.getElementById(elementTHead);

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

            row += "<tr>" + '<td class="letters">' + rowsTitle1 + '</td>';

            for (var k = 0; k < rowsTitle.length; k++) {
                var idCells = rowsTitle[j] + columnsTitle[k+1];

                row += '<td id=' + idCells + " " + 'class="column">' + emptyCell + '</td>';
            }
            row += "</tr>";
        }


        $(elementTBody).html(row);

    }

    printGamePlayerGrid1.append(tableHead);
}
//Función para printar los salvos del player

function printSalvos (data) {
    for (var i = 0; i < data.gamePlayer.length, i<data.salvoes.length; i++) {

        var gpId = data.gamePlayer[i].id;
        var idUser = data.gamePlayer[i].player.id;
        var gpIdUrl = getParameterByName('gp');
        var salvos = data.salvoes[i];
        var salvosPlayers = Object.keys(salvos);

        if (gpId == gpIdUrl) {

            var turn = salvos[salvosPlayers];

            for (var j = 0; j<turn.length; j++){

                var turns = turn[j];
                var turnsNumber = Object.keys(turns);
                var valueTurn = turns[turnsNumber];

                for (var k=0; k<valueTurn.length; k++) {
                    var valueTurnPosition = valueTurn[k];

                    $(".table2 td").each(function(){
                        var cellId = $(this).attr('id');
                        if(cellId === valueTurnPosition){
                            $(this).css('background-color', 'mediumturquoise');
                            $(this).html(turnsNumber);
                        }
                    })
                }
            }
        }
    }
}

//función para printar los barcos y los salvo hits del oponente

function printShips (data) {
    var ships = data.ships;

    for (var i = 0; i<ships.length; i++) {

        var shipsLoc = ships[i].locations;

        for (var j = 0; j<shipsLoc.length; j++) {

            var shipsLocations = shipsLoc[j];
            // $('#'+ shipsLocations).html('gggggg').addClass('cellWithShip');

            $(".table1 td").each(function(){
                var cellId = $(this).attr('id');
                if(cellId === shipsLocations){
                    $(this).css('background-color', 'palegreen');
                }
            })
        }
    }

    for (var m = 0; m < data.gamePlayer.length, m<data.salvoes.length; m++) {

        var gpId = data.gamePlayer[m].id;
        var idUser = data.gamePlayer[m].player.id;
        var gpIdUrl = getParameterByName('gp');
        var salvos = data.salvoes[m];
        var salvosPlayers = Object.keys(salvos);

        if (gpId != gpIdUrl) {

            var turn = salvos[salvosPlayers];

            for (var l = 0; l<turn.length; l++){

                var turns = turn[l];
                var turnsNumber = Object.keys(turns);
                var valueTurn = turns[turnsNumber];

                for (var m=0; m<valueTurn.length; m++) {
                    var valueTurnPosition = valueTurn[m];

                    $(".table1 td").filter(function(){
                        return $(this).attr('style');
                    })
                        .each(function(){
                        var cellId = $(this).attr('id');

                        if(cellId === valueTurnPosition) {

                            $(this).css('background-color', 'red');
                            $(this).html(turnsNumber);

                        }
                    })

                }
            }
        }
    }
}

//Función para printar el usuario vs el oponente

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




