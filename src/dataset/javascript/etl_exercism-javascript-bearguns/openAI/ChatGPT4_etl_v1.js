'use strict'
class ETL {
  transform(scores) {
    const newScores = {};
    for (const [key, letters] of Object.entries(scores)) {
      for (const letter of letters) {
        newScores[letter.toLowerCase()] = +key;
      }
    }
    return newScores;
  }
}

export default ETL;