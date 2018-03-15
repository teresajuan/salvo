

$.getJSON(relatedUrl("gp"), function(json) {
    var data = json;
    console.log(data);
    printShipsGrid("shipTHead1", "#shipTBody1");
    printSalvoGrid("salvoTHead2", "#salvoTBody2");
    printShips(data);
    printSalvos(data);
    usersTitle(data);
});

//Función para crear salvos

function createSalvo(salvoCreated){

    var gpId = getParameterByName("gp");

    $.post({
        url: "/games/players/" + gpId + "/salvos",
        data: JSON.stringify(salvoCreated),
        dataType: "JSON",
        contentType: "application/json"
    }).done(function(){
        location.reload();
        alert("salvo created SUCCESFULLY");
    }).fail(function(response){
        alert(response.responseJSON.error);
    })
}

$('#createSalvo').click(function() {

    if (infoSalvo.salvoLocation.length < 5){

        alert('The number of shots is too low. You must have 5 shots.');

    } else if (infoSalvo.salvoLocation.length > 5) {

        alert('The number of shots is too high. You must have 5 shots.');

    } else {

        createSalvo(infoSalvo);

    }
});

var infoSalvo = {"salvoLocation": []};

function salvoClick(e) {

    var idCell = e.target.getAttribute('id');

    if (e.target.getAttribute('data-salvo')) {

        removeItemFromArr(infoSalvo.salvoLocation, idCell);
        document.getElementById(idCell).style.backgroundColor = "";

    } else {

        e.target.setAttribute('data-salvo', 'true');
        infoSalvo.salvoLocation.push(idCell);

        document.getElementById(idCell).style.backgroundColor = "red";
    }

}

function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
}




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

    var totalLocations = warningOverlapShip(infoShips);
    var shipsInGrid = detectOutGrid(infoShips);

    var allLocations = getAllLocations(infoShips);

    if (allLocations.length < 17){

        alert("Error in number of ships");

    } else if (totalLocations === true) {

        alert("There are ships overlap");

    } else if (shipsInGrid === true) {

        alert("There are ships out grid");

    } else {

        createShips(infoShips);

    }

});

//Funcion inicial del drag and drop

var infoShips = [{"shipType": "destroyer", "shipLoc": []},
    {"shipType": "submarine", "shipLoc": []},
    {"shipType": "battleship", "shipLoc": []},
    {"shipType": "aircraft", "shipLoc": []},
    {"shipType": "patrolboat", "shipLoc": []}];

var dragged;
function dragStart(e) {

    dragged = e.target;

    e.dataTransfer.setData("Data", e.target.id);
    e.dataTransfer.effectAllowed = 'move';
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

    dataStyle.position = "absolute";
    dataStyle.backgroundColor = 'lightgreen';
    dataStyle.left = posXHorizontal + "px";
    dataStyle.top = posYHorizontal - 50 + "px";
    e.target.style.border = '';

    document.getElementById(data).setAttribute('data-firstCell', e.target.id);

    createShipLoc(data, infoShips, e.target.id);

    if(warningOverlapShip(infoShips) === true) {

        alert('There is a ship overlap');

    }

    if(detectOutGrid(infoShips) === true) {
        alert('There is a ship out of grid');
    }

}

function detectOutGrid(shipArray) {

    for (var i=0; i<shipArray.length; i++) {
        for (var j=0; j<shipArray[i].shipLoc.length; j++){
            var shipLocLetter = shipArray[i].shipLoc[j].substring(0, 1);
            var shipLocLetterAsci = shipLocLetter.charCodeAt(0);
            var shipLocNumber = shipArray[i].shipLoc[j].substring(1);

            if (shipLocLetterAsci > 74 || shipLocNumber > 10) {

                return true;
            }
        }
    }
}


Array.prototype.unique=function(a){

    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function getAllLocations(shipsArray) {

    var allLocations = [];

    for (var i=0; i<shipsArray.length; i++) {

        for (var j=0; j<shipsArray[i].shipLoc.length; j++) {

            allLocations.push(shipsArray[i].shipLoc[j]);

        }
    }

    return allLocations;
}

function warningOverlapShip(shipArray) {

    var allLocations = getAllLocations(shipArray);
    var allLocationsSize = allLocations.length;
    var locationsWithoutRepeted = allLocations.unique();
    var locationsWithoutRepetedSize = locationsWithoutRepeted.length;

    if (locationsWithoutRepetedSize < allLocationsSize) {

        return true;

    } else {

        return false;
    }
}

function createDragElements(idShip) {
    document.getElementById(idShip).addEventListener('dragstart', dragStart, false);
    document.getElementById(idShip).addEventListener('dragend', dragEnd, false);
}

createDragElements('aircraft');
createDragElements('battleship');
createDragElements('destroyer');
createDragElements('submarine');
createDragElements('patrolboat');

function createShipLoc(idShip, shipsArray, firstCell) {

    var dataClass = document.getElementById(idShip).getAttribute('class');

    for (var i=0; i<shipsArray.length; i++) {

        if (idShip === shipsArray[i].shipType) {

            if (dataClass == 'aircraft') {

                createHorizontalShipLocArray(5, shipsArray[i].shipLoc, firstCell);

            }

            if (dataClass == 'battleship') {

                createHorizontalShipLocArray(4, shipsArray[i].shipLoc, firstCell);

            }

            if (dataClass == 'destroyer' || dataClass == 'submarine') {

                createHorizontalShipLocArray(3, shipsArray[i].shipLoc, firstCell);

            }

            if (dataClass == 'patrolboat') {

                createHorizontalShipLocArray(2, shipsArray[i].shipLoc, firstCell);

            }

            if (dataClass == 'verticalAircraft') {

                createVerticalShipLocArray(5, shipsArray[i].shipLoc, firstCell);

            }

            if (dataClass == 'verticalBattleship') {

                createVerticalShipLocArray(4, shipsArray[i].shipLoc, firstCell);

            }

            if (dataClass == 'verticalDestroyer' || dataClass == 'verticalSubmarine') {

                createVerticalShipLocArray(3, shipsArray[i].shipLoc, firstCell);

            }
            if (dataClass == 'verticalPatrolboat') {

                createVerticalShipLocArray(2, shipsArray[i].shipLoc, firstCell);

            }
        }
    }
    console.log(infoShips);
}

function createHorizontalShipLocArray(numberOfRepetitions, shipLocArray, firstCell) {

    var shipLoc = firstCell;
    var shipLocLetter = shipLoc.substring(0, 1);
    var shipLocNumber = shipLoc.substring(1);
    var shipLocNumberInt = parseInt(shipLocNumber);

    if (shipLocArray.length === 0) {

        for (var i=0; i<numberOfRepetitions; i++) {

            shipLocArray.push(shipLocLetter+(shipLocNumberInt+i));
        }

        return shipLocArray;

    }else {

        shipLocArray.length = 0;

        for (var i=0; i<numberOfRepetitions; i++) {

            shipLocArray.push(shipLocLetter+(shipLocNumberInt+i));
        }

        return shipLocArray;
    }
}

function createVerticalShipLocArray(numberOfRepetitions, shipLocArray, firstCell) {

    var shipLoc = firstCell;
    var shipLocLetter = shipLoc.substring(0, 1);
    var shipLocLetterAsci = shipLocLetter.charCodeAt(0);
    var shipLocNumber = shipLoc.substring(1);

    if (shipLocArray.length === 0) {

        for (var i=0; i<numberOfRepetitions; i++) {

            shipLocArray.push((String.fromCharCode(shipLocLetterAsci+i)+shipLocNumber));
        }

        return shipLocArray;

    }else {
        shipLocArray.length = 0;

        for (var i=0; i<numberOfRepetitions; i++) {

            shipLocArray.push((String.fromCharCode(shipLocLetterAsci+i)+shipLocNumber));
        }

        return shipLocArray;
    }
}

function changeShipPosition (idShip, verticalAttribute, shipsArray) {

    var ship = document.getElementById(idShip);

    ship.addEventListener('click', function(){

        var firstCell = ship.getAttribute('data-firstCell');
        var shipPosition = ship.getAttribute('class');

        if (shipPosition != verticalAttribute) {

            ship.setAttribute('class', verticalAttribute);

            if (firstCell != 0) {

                createShipLoc(idShip, shipsArray, firstCell);

                if(warningOverlapShip(infoShips) === true) {
                    alert('There is a ship overlap');
                }

                if(detectOutGrid(infoShips) === true) {
                    alert('There is a ship out of grid');
                }

            }

        }

        if (shipPosition != idShip) {

            ship.setAttribute('class', idShip);

            if (firstCell != 0) {

                createShipLoc(idShip, shipsArray, firstCell);

                if(warningOverlapShip(infoShips) === true) {
                    alert('There is a ship overlap');
                }

                if(detectOutGrid(infoShips) === true) {
                    alert('There is a ship out of grid');
                }

            }

        }

    });
}

changeShipPosition('aircraft', 'verticalAircraft', infoShips);
changeShipPosition('battleship', 'verticalBattleship', infoShips);
changeShipPosition('destroyer', 'verticalDestroyer', infoShips);
changeShipPosition('submarine', 'verticalSubmarine', infoShips);
changeShipPosition('patrolboat', 'verticalPatrolboat', infoShips);


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

function printShipsGrid(elementTHead, elementTBody){

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

                row += '<td id=' + idCells + " " + 'class="column"' + " " + 'ondrop=' + "drop(event)" + " " + 'ondragleave=' + "dragLeave(event)" + " " + 'ondragenter=' + "dragEnter(event)" + " " + 'ondragover=' + "dragOver(event)" + '>' + emptyCell + '</td>';

            }
            row += "</tr>";
        }

        $(elementTBody).html(row);

    }

    printGamePlayerGrid1.append(tableHead);

}

function printSalvoGrid(elementTHead, elementTBody){

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

                row += '<td id=' + 'salvo' + idCells + " " + 'class="column"' + " " + 'onclick=' + "salvoClick(event)" + '>' + emptyCell + '</td>';

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
                            $(this).css('background-color', 'yellow');
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




