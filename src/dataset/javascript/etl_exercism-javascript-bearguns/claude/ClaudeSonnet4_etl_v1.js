'use strict'
class ETL {
  transform(scores) {
    const newScores = {};
    
    for (const key in scores) {
      const numKey = +key;
      const letters = scores[key];
      for (let i = 0; i < letters.length; i++) {
        newScores[letters[i].toLowerCase()] = numKey;
      }
    }

    return newScores;
  }
}

export default ETL;