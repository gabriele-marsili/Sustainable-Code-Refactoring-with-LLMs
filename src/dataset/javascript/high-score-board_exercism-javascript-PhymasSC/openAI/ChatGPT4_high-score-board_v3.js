/// <reference path="./global.d.ts" />
// @ts-check

export function createScoreBoard() {
	return Object.create(null, { "The Best Ever": { value: 1000000, writable: true, enumerable: true } });
}

export function addPlayer(scoreBoard, player, score) {
  scoreBoard[player] = score;
  return scoreBoard;
}

export function removePlayer(scoreBoard, player) {
  Reflect.deleteProperty(scoreBoard, player);
  return scoreBoard;
}

export function updateScore(scoreBoard, player, points) {
  if (player in scoreBoard) scoreBoard[player] += points;
  return scoreBoard;
}

export function applyMondayBonus(scoreBoard) {
  Object.keys(scoreBoard).forEach(player => scoreBoard[player] += 100);
  return scoreBoard;
}

export function normalizeScore({ score, normalizeFunction }) {
  return normalizeFunction(score);
}