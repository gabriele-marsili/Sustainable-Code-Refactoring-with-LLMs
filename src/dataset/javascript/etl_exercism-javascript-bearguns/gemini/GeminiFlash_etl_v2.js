'use strict'
class ETL {
  transform(scores) {
    const newScores = {};

    for (const score in scores) {
      if (Object.hasOwn(scores, score)) {
        const letters = scores[score];
        for (let i = 0; i < letters.length; i++) {
          newScores[letters[i].toLowerCase()] = Number(score);
        }
      }
    }

    return newScores;
  }
}

export default ETL;