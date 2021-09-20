export const generateGameQuestions = (questions, players) => {
    if(!players) {
        return "error";
    }
    let questionsCount;
    
    //TODO: Add limitations to how many game questions there could be
    // const gamesCount = players.length;
    const {dare, question, game} = questions;
    const categories = {
        1: dare,
        2: question,
        3: game
    };
    //Determine if there are enough questions, or just to put all of them
    questionsCount = dare.length + question.length + game.length < players.length*5 ? dare.length + question.length + game.length : questionsCount;
    let result = [];
    for(let i = 0; i < questionsCount; i++) {
        let type;
        do {
            //Loop until we generate category, that is not empty
            type = Math.floor(Math.random() * 3) + 1;
        } while(categories[type].length === 0);

        const currentIndex = Math.floor(Math.random() * categories[type].length);
        const currentNameForReplace = players[Math.floor(Math.random() * players.length)];
        //Replace the name placeholder with a randomly selected name
        const question = categories[type][currentIndex].indexOf("#{name}") === -1 ? 
            categories[type][currentIndex] : 
            categories[type][currentIndex].replace("#{name}" , currentNameForReplace.name);
        result.push({type, question});
        categories[type].splice(currentIndex, 1);
    }
    return result;
}