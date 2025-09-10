'use strict'
class ETL {
  transform(scores) {
    const newScores = {};

    for (const key in scores) {
      if (Object.hasOwn(scores, key)) {
        const letters = scores[key];
        const score = Number(key);

        for (let i = 0; i < letters.length; i++) {
          newScores[letters[i].toLowerCase()] = score;
        }
      }
    }

    return newScores;
  }
}

export default ETL;