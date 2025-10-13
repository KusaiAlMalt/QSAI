function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function pickRandom(array, n){
    if(n>array.length) throw new Error('Cannot pick more elements than available');
    return shuffle(array).slice(0,n);
}

function divideIntoGroups(array, groupCount){
    if (groupCount <= 1) throw new Error('Group count must be >1');
    const shuffled = shuffle(array);
    const groups = Array.from({length:groupCount}, () => []);
    shuffled.forEach((item, index) => {
        groups[index%groupCount].push(item);
    });
    return groups;
}

module.exports = {
    shuffle,
    pickRandom,
    divideIntoGroups
}