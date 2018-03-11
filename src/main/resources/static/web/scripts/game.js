

$.getJSON(relatedUrl("gp"), function(json) {
    var data = json;
    console.log(data);
    printGrid("shipTHead1", "#shipTBody1");
    // printGrid("salvoTHead2", "#salvoTBody2");
    printShips(data);
    printSalvos(data);
    usersTitle(data);
});

//Funcion para que el usuario cree barcos desde el frontend

function createShips(shipsCreated){

    var gpId = getParameterByName("gp");

    $.post({
        url: "/games/players/" + gpId + "/ships",
        data: JSON.stringify(shipsCreated),
        dataType: "JSON",
        contentType: "application/json"
    }).done(function(){
        location.reload();
        alert("ships created SUCCESFULLY");
    }).fail(function(response){
        alert(response.responseJSON.error);
    })
}

$('#createShips').click(function(){
    if(infoShips.length === 3){
        createShips(infoShips);
    } else{
        alert("error in number of ships");
    }
});

//Funcion inicial del drag and drop

var infoShips = [{"shipType": "destroyer", "shipLoc": []},
    {"shipType": "submarine", "shipLoc": []},
    {"shipType": "battleship", "shipLoc": []}];

function dragStart(e) {
    e.dataTransfer.setData("Data", e.target.id);
    e.target.style.opacity = '0.4';
    e.target.style.backgroundColor = '';

    console.log("drag START");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.target.style.border = '3px dotted #555';
}

function dragLeave(e) {
    e.target.style.border = '';
}

function dragEnd(e) {
    e.target.style.opacity = '';         // Restaura la opacidad del elemento
    e.dataTransfer.clearData("Data");
}

function drop(e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    e.preventDefault();

    var data = e.dataTransfer.getData("Data");
    e.target.appendChild(document.getElementById(data));

    // Posicion del elemento sobre el que se arrastra
    posXHorizontal = $(e.target).position().left;
    posYHorizontal = $(e.target).position().top;

    var dataStyle = document.getElementById(data).style;
    var dataClass = document.getElementById(data).getAttribute('class');

    dataStyle.position="absolute";
    dataStyle.backgroundColor = 'lightgreen';
    dataStyle.left=posXHorizontal+"px";
    dataStyle.top=posYHorizontal - 50+"px";
    e.target.style.border = '';

    if (dataClass == 'verticalBattleship') {

        dataStyle.left=posXHorizontal - 75+"px";
        dataStyle.top=posYHorizontal - 25+"px";

    } else if (dataClass == 'verticalDestroyer' ||
        dataClass == 'verticalSubmarine' ) {
        dataStyle.left=posXHorizontal - 50+"px";
        dataStyle.top=posYHorizontal - 25+"px";
    }

    console.log("DROP");
    console.log(e.target.id);
    console.log(data);
    console.log(document.getElementById(data).getAttribute('class'));

    var shipLoc = e.target.id;
    var shipLocLetter = shipLoc.substring(0, 1);
    var shipLocNumber = shipLoc.substring(1);
    var shipLocNumberInt = parseInt(shipLocNumber);

    var shipLocLetterAsci = shipLocLetter.charCodeAt(0);


    for (var i=0; i<infoShips.length; i++) {

        if (data === infoShips[i].shipType) {

            if (dataClass == 'battleship') {

                infoShips[i].shipLoc = [(shipLocLetter+(shipLocNumberInt+0)),
                                        (shipLocLetter+(shipLocNumberInt+1)),
                                        (shipLocLetter+(shipLocNumberInt+2)),
                                        (shipLocLetter+(shipLocNumberInt+3))];
            }

            if (dataClass == 'destroyer' || dataClass == 'submarine') {

                infoShips[i].shipLoc = [(shipLocLetter+(shipLocNumberInt+0)),
                                        (shipLocLetter+(shipLocNumberInt+1)),
                                        (shipLocLetter+(shipLocNumberInt+2))];
            }

            if (dataClass == 'verticalBattleship') {

                infoShips[i].shipLoc = [(String.fromCharCode(shipLocLetterAsci)+shipLocNumber),
                                        (String.fromCharCode(shipLocLetterAsci+1)+shipLocNumber),
                                        (String.fromCharCode(shipLocLetterAsci+2)+shipLocNumber),
                                        (String.fromCharCode(shipLocLetterAsci+3)+shipLocNumber)];
            }

            if (dataClass == 'verticalDestroyer' || dataClass == 'verticalSubmarine') {

                infoShips[i].shipLoc = [(String.fromCharCode(shipLocLetterAsci)+shipLocNumber),
                                        (String.fromCharCode(shipLocLetterAsci+1)+shipLocNumber),
                                        (String.fromCharCode(shipLocLetterAsci+2)+shipLocNumber)];
            }
        }
    }
    console.log(infoShips);
}

function changeShipPosition (idShip, cssClassHorizontal, cssClassVertical) {

    $(idShip).click(function(){

        if (this.getAttribute('class') === cssClassVertical) {

            this.setAttribute('class', cssClassHorizontal);

        } else {

            this.setAttribute('class', cssClassVertical);
        }
    });
}

changeShipPosition('#battleship', 'battleship', 'verticalBattleship');
changeShipPosition('#destroyer', 'destroyer', 'verticalDestroyer');
changeShipPosition('#submarine', 'submarine', 'verticalSubmarine');










/*funciones para devolver el api correspondiente en función del gp seleccionado*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function relatedUrl(locationData) {

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

                row += '<td id=' + idCells + " " + 'class="column"' + " " +  'ondrop="drop(event)"' + " " + 'ondragover="dragOver(event)"' + " " + 'ondragenter="dragEnter(event)"' + " " + 'ondragleave="dragLeave(event)"' + '>' + emptyCell + '</td>';
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

                for (var n=0; n<valueTurn.length; n++) {
                    var valueTurnPosition = valueTurn[n];

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
            $('#userPlayer').html(emailUser);
        } else {
            $('#userOpponent').html(emailUser);
        }

    }

    if (data.gamePlayer.length === 1) {

        $('#userOpponent').html("WAITING FOR OPPONENT ").css('color', 'red');
    }

}




