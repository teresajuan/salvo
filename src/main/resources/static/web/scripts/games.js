

$.getJSON("http://localhost:8080/api/games", function(json) {
    var data = json;
    console.log(data);
    // createGamesList(data);
    createTableLeaderBoard(data);
    playersScoreInfo(data);
    // playerScores(data, 1);
    // playerScores(data, 2);
    // playerScores(data, 3);
    // playerScores(data, 4);
    sumaScores(data, 1);
    sumaScores(data, 2);
    sumaScores(data, 3);
    sumaScores(data, 4);



});

function createGamesList(data) {

    var printListGames = document.getElementById('gamesList');

    for(var i = 0; i < data.length; i++){

        var eachGame = data[i];
        var date = new Date(eachGame.created);
        var formatCreationDate = date.toLocaleString();
        var idEachGame = eachGame.id;

        var element1= document.createElement('li');
        var element2= document.createElement('ol');


        element1.append("Id Game: " + idEachGame);
        element1.append(" / " + "Creation Game: " + formatCreationDate);
        element2.append("GamePlayers:");

        for(var j = 0; j < eachGame.gamePlayers.length; j++) {
            var idEachGamePlayer = eachGame.gamePlayers[j].id;
            var playerEachGamePlayerId = eachGame.gamePlayers[j].player.id;
            var playerEachGamePlayerEmail = eachGame.gamePlayers[j].player.email;

            var element3= document.createElement('li');
            var element5= document.createElement('ol');
            var element6= document.createElement('li');
            var element7= document.createElement('li');

            element5.setAttribute('class', 'listStyle1');
            element6.setAttribute('class', 'listStyle1');
            element7.setAttribute('class', 'listStyle1');

            element1.append(element2);
            element2.append(element3);
            element3.append("Id: " + idEachGamePlayer);
            element6.append("Id: " + playerEachGamePlayerId);
            element7.append("email: " + playerEachGamePlayerEmail);
            element5.append("Player:");
            element5.append(element6);
            element5.append(element7);
            element3.append(element5);
        }
        printListGames.append(element1);
    }
}

// Crear la tabla leaderboard

function createTableLeaderBoard(data) {
    var printTableLeader = document.getElementById('tableLeader');

    var tableData = ordenMayorAMenor(playersScoreInfo(data), "totalScore", "lost");

    console.log(tableData);

    var tableLeader = "";

    for(var i=0; i<tableData.length; i++){

        var tableNames = tableData[i].name;
        var total = tableData[i].totalScore;
        var won = tableData[i].won;
        var lost = tableData[i].lost;
        var tied = tableData[i].tied;

        tableLeader += '<tr>' +
            '<td>' + tableNames + '</td>' +
            '<td>' + total + '</td>' +
            '<td>' + won + '</td>' +
            '<td>' + lost + '</td>' +
            '<td>' + tied + '</td>' +
            '</tr>';
    }
    $(printTableLeader).html(tableLeader);
}

//conseguir la información para los scores  de los players

function playersScoreInfo (data){

    var totalPlayersInfo = [];
    for (var i = 0; i<data.length; i++) {
        var gamePlayers = data[i].gamePlayers;


        for (var j=0; j<gamePlayers.length; j++){
             var players = {};
             var playerScore = gamePlayers[j].player.score;
             players.name = gamePlayers[j].player.email;
             players.totalScore = 0;
             players.won = 0;
             players.lost = 0;
             players.tied = 0;

             if (totalPlayersInfo.length === 0) {
                 totalPlayersInfo.push(players);
             }

             for (var k = 0; k < totalPlayersInfo.length; k++) {

                 if (players.name === totalPlayersInfo[k].name) {
                     if(playerScore === 1.0){
                         totalPlayersInfo[k].won++;
                     } else if (playerScore === 0.5) {
                         totalPlayersInfo[k].tied++;
                     } else if (playerScore === "null"){
                         totalPlayersInfo[k].won += 0;
                         totalPlayersInfo[k].tied += 0;
                         totalPlayersInfo[k].lost += 0;
                     }
                     else {
                         totalPlayersInfo[k].lost++;
                     }
                     totalPlayersInfo[k].totalScore = sumaScores(data, gamePlayers[j].player.id);
                     break;
                 } else {
                     if (k == (totalPlayersInfo.length - 1)) {
                         totalPlayersInfo.push(players);
                     }
                 }
             }
        }
    }

console.log(totalPlayersInfo);
    return totalPlayersInfo;
}

//Crear un array con todos los scores para cada player

function playerScores(data, idPlayer) {

    var totalPlayerScores = [];
    for (var i = 0; i<data.length; i++) {
        var gamePlayers = data[i].gamePlayers;

        for (var j=0; j<gamePlayers.length; j++){
            var playerId = gamePlayers[j].player.id;
            var playerScore = gamePlayers[j].player.score;

            if(playerId == idPlayer){
                totalPlayerScores.push(playerScore);
            }
        }
    }
    return totalPlayerScores;
}

function sumaScores(data, idPlayer){

    var totalPlayerScores = playerScores(data, idPlayer);
    var sumaScores = 0;
    var playerScoresWithoutNulls = [];

    for (var i = 0; i<totalPlayerScores.length; i++) {

        if(totalPlayerScores[i] != "null"){
            playerScoresWithoutNulls.push(totalPlayerScores[i]);
        }
    }
    for (var i = 0; i<playerScoresWithoutNulls.length; i++) {

        sumaScores += playerScoresWithoutNulls[i];
    }
    return fijarDecimales(sumaScores, 1);

}

function fijarDecimales (number, decimals) {
    return number.toFixed(decimals);
}

function ordenMayorAMenor(arrayAOrdenar, paramToOrder, paramToOrder2){

    var arrayOrdenado = arrayAOrdenar.sort (function(a, b) {
        if (a[paramToOrder] < b[paramToOrder]) {
            return 1;
        }
        if (a[paramToOrder] > b[paramToOrder]) {
            return -1;
        }
        if (a[paramToOrder] === b[paramToOrder]) {
            var x = a[paramToOrder2];
            var y = b[paramToOrder2];

            return x < y ? -1 : x > y ? 1 : 0;
            }
    });
    return arrayOrdenado;
}

















