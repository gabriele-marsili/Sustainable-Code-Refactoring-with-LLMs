"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.score = score;
const ScrabbleScoring = {
    a: 1,
    b: 3,
    c: 3,
    d: 2,
    e: 1,
    f: 4,
    g: 2,
    h: 4,
    i: 1,
    j: 8,
    k: 5,
    l: 1,
    m: 3,
    n: 1,
    o: 1,
    p: 3,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 4,
    w: 4,
    x: 8,
    y: 4,
    z: 10
};
const letterScores = new Map(Object.entries(ScrabbleScoring));
function score(word = '') {
    let totalScore = 0;
    const lowerCaseWord = word.toLowerCase();
    for (let i = 0; i < lowerCaseWord.length; i++) {
        const letter = lowerCaseWord[i];
        const score = letterScores.get(letter);
        if (score !== undefined) {
            totalScore += score;
        }
    }
    return totalScore;
}
