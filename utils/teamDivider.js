module.exports = {
    divideIntoTwoTeams(namesList){

        var len = namesList.length;
        var firstTeam = [];
        var secondTeam = [];
        
        var indexSet = new Set();

        var randInt = Math.floor(Math.random()*namesList.length);

        while (len>0){
            while(indexSet.has(randInt)){
            randInt = Math.floor(Math.random()*namesList.length);
            }

            if (len%2===0){
                firstTeam.push(namesList[randInt]);
            }
            else{
                secondTeam.push(namesList[randInt]);
            }
            
            indexSet.add(randInt)
            len--;
        }

        return [firstTeam, secondTeam];
    }
}