'use strict'
class ETL {
  transform(scores) {
    const newScores = Object.create(null);

    for (const [key, letters] of Object.entries(scores)) {
      const score = Number(key);
      for (const letter of letters) {
        newScores[letter.toLowerCase()] = score;
      }
    }

    return newScores;
  }
}

export default ETL;