

$.getJSON("http://localhost:8080/api/games", function(json) {
    var data = json;
    console.log(data);
    createGamesList(data);
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

