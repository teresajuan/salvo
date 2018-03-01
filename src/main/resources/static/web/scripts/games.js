


$.getJSON("http://localhost:8080/api/games")
    .done(function(json) {
        var data = json;
        console.log(data);
        // createGamesList(data);
        createGamesTable(data);
        createTableLeaderBoard(data);

        clickButtons();

        $('document').ready(function(){
            var player = data.player;
            var playerName = player.name;

            if (player != "null") {
                loginInterface(playerName);
            } else{
                logoutInterface();
            }
        })

    });

function createGamesList(data) {

    var printListGames = document.getElementById('gamesList');

    for(var i = 0; i < data.games.length; i++){

        var eachGame = data.games[i];
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

//Crear tabla de games

function createGamesTable(data) {

    var printTableGames = document.getElementById('bodyTableGames');

    for (var i = 0; i < data.games.length; i++) {

        var eachGame = data.games[i];
        var idEachGame = eachGame.id;
        var date = new Date(eachGame.created);
        var formatCreationDate = date.toLocaleString();
        var gpEachGame = eachGame.gamePlayers;

        var row1 = document.createElement('tr');

        var cell1 = document.createElement('td');
        var cell2 = document.createElement('td');
        var cell3 = document.createElement('td');
        var cell4 = document.createElement('td');

        var goToGame = document.createElement('a');

        goToGame.setAttribute('class', 'btn btn-primary');

        cell1.append(idEachGame);
        cell2.append(formatCreationDate);

        if (gpEachGame[0] && gpEachGame[1]) {
            var player1 = eachGame.gamePlayers[0].player.email;
            var player2 = eachGame.gamePlayers[1].player.email;
            var gpId1 = eachGame.gamePlayers[0].id;
            var gpId2 = eachGame.gamePlayers[1].id;

            cell3.append(player1);
            cell4.append(player2);

            var userLogged = data.player.name;

            if (userLogged == player1) {
                goToGame.append('Go to your game');
                cell3.append(goToGame);
                goToGame.setAttribute('href', 'http://localhost:8080/web/game.html?gp=' + gpId1 + '');

            }else if(userLogged == player2) {
                goToGame.append('Go to your game');
                cell4.append(goToGame);
                goToGame.setAttribute('href', 'http://localhost:8080/web/game.html?gp=' + gpId2 + '');
            }

        } else {
            var player1 = eachGame.gamePlayers[0].player.email;
            var gpId1 = eachGame.gamePlayers[0].id;
            cell3.append(player1);

            var userLogged = data.player.name;

            if (userLogged == player1) {
                goToGame.append('Go to your game');
                cell3.append(goToGame);
                goToGame.setAttribute('href', 'http://localhost:8080/web/game.html?gp=' + gpId1 + '');
            }
        }

        row1.append(cell1);
        row1.append(cell2);
        row1.append(cell3);
        row1.append(cell4);
        printTableGames.append(row1);
    }
}


// Crear la tabla leaderboard

function createTableLeaderBoard(data) {
    var printTableLeader = document.getElementById('tableLeader');

    var tableData = ordenMayorAMenor(playersScoreInfo(data), "totalScore", "lost");

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
    for (var i = 0; i<data.games.length; i++) {
        var gamePlayers = data.games[i].gamePlayers;

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

    return totalPlayersInfo;
}

//Crear un array con todos los scores para cada player

function playerScores(data, idPlayer) {

    var totalPlayerScores = [];
    for (var i = 0; i < data.games.length; i++) {
        var gamePlayers = data.games[i].gamePlayers;

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

// Función para sumar los scores de cada player

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

//Función para logearse

function loginInterface(name){
    //Para mostrar y ocultar botones y demás contenidos
    $('#logout').show();
    $('#login, #signin, #labelUsername, #username, #labelPassword, #password').hide();

    var username = document.getElementById("username");
    var user = $("#currentUser").html("Welcome, " + JSON.stringify(name));

    user.css('display', 'inline-block');

}
//Función para limpiar campos

function cleanInputs(){
    $('input[type="email"]').val('');
    $('input[type="password"]').val('');
}

//Función para loguearse

function login(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    $.post("/api/login", { username: username.value, password: password.value }).done(function(){
        loginInterface();
        cleanInputs;
        location.reload();
        console.log("estás login");
    }).fail(function(response){
        alert("login incorrecto" + "Recuerda!! Debes estar registrado para poder accdeder al login");
        cleanInputs();
    })
}

//Funciónn para logoutarse

function logoutInterface(){
    $('#logout, #currentUser').hide();
    $('#login, #signin, #labelUsername, #username, #labelPassword, #password').show();
}

function logout(){
    $.post("/api/logout").done(function() {
        logoutInterface();
        location.reload();
        console.log("Estás logged out"); })
}

//Funcion para registrarse

function signin(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    $.post("/api/players", { username: username.value, password: password.value }).done(function(){
        alert("Enhorabuena!! Te has registrado con éxito");
        login();
    }).fail(function(response){
        alert(response.responseJSON.error);
        cleanInputs();
    })
}

//Funcion para crear nuevos games

function createNewGame() {

    $.post("/api/games").done(function(response){

        window.location.replace('/web/game.html?gp=' + response.gpId + '');

    }).fail(function(response){
        alert(response.responseJSON.error);
    })
}

//Funcion clicar

function clickButtons() {
    $('#login').click(function(){
        var username = document.getElementById("username");
        var password = document.getElementById("password");

        if(username.value && password.value) {
            return login();
        }
        $.post("/api/players", { username: username.value, password: password.value }).fail(function(response){
            alert(response.responseJSON.error);
            cleanInputs();
        })

    });
    $('#logout').click(logout);
    $('#signin').click(signin);
    $('#newGame').click(createNewGame);

}























