

function divideTeams(namesList){
    
    var blueTeam = [];
    var redTeam = [];
    var len = namesList.length;
    
    var indexSet = new Set([-1]);

    var randInt = -1;

    while (len>0){
        while(indexSet.has(randInt)){
           randInt = Math.floor(Math.random()*namesList.length);
        }
        if (len%2===0){
            blueTeam.push(namesList[randInt]);
        }
        else{
            redTeam.push(namesList[randInt]);
        }
        indexSet.add(randInt)
        len--;
    }



    return [blueTeam, redTeam];
}


const list = ['kusai','andy','intersy','johan', 'lin'];
console.log(list);
console.log(divideTeams(list))

console.log(Math.floor(Math.random()))