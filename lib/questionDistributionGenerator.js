export const generateGameQuestions = (questions, players) => {
    if(!players) {
        return "error";
    }
    console.log("Questions are: ", questions);
    console.log("Players are: ", players);
    let questionsCount;
    
    //TODO: Add limitations to how many game questions there could be
    // const gamesCount = players.length;
    const {dare, question, game} = questions;
    const categories = {
        1: dare,
        2: game,
        3: question
    };
    //Determine if there are enough questions, or just to put all of them
    questionsCount = dare.length + question.length + game.length < players.length*5 ? dare.length + question.length + game.length : players.length*5;
    let result = [];
    //An array with the auto generated game ending cards
    let gameEnds = {};
    console.log("Is this shit even workin ?????")
    for(let i = 0; i < questionsCount; i++) {
        let type;
        console.log(gameEnds)
        if(Object.keys(gameEnds).includes(`${i}`)) {
            console.log("We are in the if")
            result.push(gameEnds[i]);
            continue;
        }
        do {
            //Loop until we generate category, that is not empty
            type = Math.floor(Math.random() * 3) + 1;
        } while(categories[type].length === 0);

        const currentIndex = Math.floor(Math.random() * categories[type].length);
        const currentNameForReplace = players[Math.floor(Math.random() * players.length)];
        //Replace the name placeholder with a randomly selected name

        let currentQuestion = type === 2 ? game[currentIndex][0] : categories[type][currentIndex];
        const question = currentQuestion.indexOf("#{name}") === -1 ? 
            currentQuestion : 
            currentQuestion.replace("#{name}" , currentNameForReplace.name);
        result.push({type, question});
        if(type === 2) {
            console.log("The type is 2");
            questionsCount += 1;
            let releaseIndex = Math.floor(Math.random() * 5) + i;
            if(releaseIndex + i > questionsCount) releaseIndex = questionsCount - 1;
            const release = game[currentIndex][1].indexOf("#{name}") === -1 ?
                game[currentIndex][1] : 
                game[currentIndex][1].replace("#{name}", currentNameForReplace.name);
			console.log("Question count is now: ", questionsCount);
            gameEnds[releaseIndex] = {type: 2, question: release};
        }
        categories[type].splice(currentIndex, 1);
    }
    result.push({type: 4, question: "GAME OVER!"})
    return result;
} 