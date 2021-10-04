export const generateGameQuestions = (questions, players) => {
    if (!players) {
        return "error";
    }
    let questionsCount;
    const { dare, question, game } = questions;
    const categories = {
        1: dare,
        2: game,
        3: question
    };
    //Determine if there are enough questions, or just to put all of them
    const allQuestionsLength = dare.length + question.length + game.length;
    questionsCount = allQuestionsLength < players.length * 5 ? allQuestionsLength : players.length * 5;
    let result = [];
    //An array with the auto generated game ending cards
    let gameEnds = {};
    for (let i = 0; i < questionsCount; i++) {
        let type;
        let gameEndCard = Object.keys(gameEnds).includes(`${i}`)
        if (gameEndCard) {

            result.push(gameEnds[i]);
        } else {
            while (true) {
                //Loop until we generate а category, that is not empty
                type = Math.floor(Math.random() * 3) + 1;
                if (categories[type].length !== 0) {
                    break;
                }
            }

            const currentIndex = Math.floor(Math.random() * categories[type].length);
            const currentNameForReplace = players[Math.floor(Math.random() * players.length)];
            //Replace the name placeholder with a randomly selected name

            let currentQuestion = type === 2 ? game[currentIndex][0] : categories[type][currentIndex];
            const question = currentQuestion.indexOf("#{name}") === -1 ?
                currentQuestion :
                currentQuestion.replace("#{name}", currentNameForReplace.name);
            result.push({ type, question });
            if (type === 2) {
                questionsCount++;
                let releaseIndex = -1;
                //In this while loop we are generating the release index for the current game. In order to not go to an infinity loop we need the release index to be 
                //1. lesser then questionsCount, 
                //2. greater then i ,
                //3. not to exist on the gameEnds keys (to not have been generated previously)
                while (releaseIndex >= questionsCount || releaseIndex <= i || Object.keys(gameEnds).includes(`${releaseIndex}`)) {
                    releaseIndex = Math.floor(Math.random() * questionsCount);
                };


                const release = game[currentIndex][1].indexOf("#{name}") === -1 ?
                    game[currentIndex][1] :
                    game[currentIndex][1].replace("#{name}", currentNameForReplace.name);

                gameEnds[releaseIndex] = { type: 2, question: release };

            }
            const currentCategories = categories[type];
            //Remove the selected question from the categories object
            categories[type] = currentCategories.filter((el, index) => {
                return index !== currentIndex;
            })
        }
    }
    result.push({ type: 4, question: "GAME OVER!" })
    return result;

}