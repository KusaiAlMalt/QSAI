function divideTeams(namesList){

        
    var len = namesList.length;
    var blueTeam = [];
    var redTeam = [];
    
    var indexSet = new Set();

    var randInt = Math.floor(Math.random()*namesList.length);

    while (len>0){
        while(indexSet.has(randInt)){
           randInt = Math.floor(Math.random()*namesList.length);
        }

        if (len%2===0){
            blueTeam.push(namesList[randInt].trim());
        }
        else{
            redTeam.push(namesList[randInt].trim());
        }
        
        indexSet.add(randInt)
        len--;
    }



    return [blueTeam, redTeam];
}

module.exports = { divideTeams };