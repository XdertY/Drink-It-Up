export const generateGameQuestions = (questions, players) => {
    const questionsCount = players.length*5;
    const gamesCount = players.length;
    const {dare, question, game} = questions;
    const categories = {
        1: dare,
        2: question,
        3: game
    };
    let result = [];
    for(let i = 0; i < questionsCount; i++) {
        let type;
        do {
            type = Math.floor(Math.random() * 3) + 1;
        } while(categories[type].length === 0);
        const currentIndex = Math.floor(Math.random() * categories[type].length);
        const question = categories[type][currentIndex].indexOf("#{name}") === -1 ? 
            categories[type][currentIndex] : 
            categories[type][currentIndex].replace("#{name}" , "Alex");
        result.push({type, question});
        categories[type].splice(currentIndex, 1);
    }
    return result;
}