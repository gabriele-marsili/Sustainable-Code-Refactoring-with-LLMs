'use strict'
class ETL {
  transform(scores) {
    const newScores = {};
    
    for (const key in scores) {
      const numericKey = +key;
      const letters = scores[key];
      
      for (let i = 0; i < letters.length; i++) {
        newScores[letters[i].toLowerCase()] = numericKey;
      }
    }

    return newScores;
  }
}

export default ETL;