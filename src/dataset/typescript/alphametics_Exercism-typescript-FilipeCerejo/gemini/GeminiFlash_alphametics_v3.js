"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve = solve;
function solve(puzzle) {
    const equation = parse(puzzle);
    const solver = new AlphameticsSolver(equation);
    return solver.solve();
}
function parse(puzzle) {
    const [left, right] = puzzle.split(' == ');
    const leftParts = left.split(' + ');
    const rightParts = right.split(' + ');
    return new AlphameticsEquation(leftParts, rightParts);
}
class AlphameticsEquation {
    constructor(left, right) {
        this.lettersWithCount = new Map();
        this.nonZeroLetters = new Set();
        this.processOperands(left, 1);
        this.processOperands(right, -1);
    }
    processOperands(operands, multiplyCountBy) {
        for (const operand of operands) {
            let letterCount = multiplyCountBy;
            for (let i = operand.length - 1; i >= 0; i--) {
                const letter = operand[i];
                const existingCount = this.lettersWithCount.get(letter) || 0;
                this.lettersWithCount.set(letter, existingCount + letterCount);
                letterCount *= 10;
            }
            this.nonZeroLetters.add(operand[0]);
        }
    }
    getLettersWithCount() {
        return this.lettersWithCount;
    }
    getNonZeroLetters() {
        return this.nonZeroLetters;
    }
}
class AlphameticsSolver {
    constructor(equation) {
        this.equation = equation;
        this.letterCountCombination = [];
        const lettersWithCount = equation.getLettersWithCount();
        this.letters = Array.from(lettersWithCount.keys());
        this.letterCounts = Array.from(lettersWithCount.values());
        this.nonZeroLetters = equation.getNonZeroLetters();
    }
    solve() {
        this.solution = undefined;
        this.permute(0, new Array(10).fill(false));
        return this.solution;
    }
    permute(level, used) {
        if (this.solution) {
            return;
        }
        if (level === this.letters.length) {
            if (this.isSolution()) {
                this.solution = this.toSolution();
            }
            return;
        }
        for (let i = 0; i < 10; i++) {
            if (!used[i]) {
                this.letterCountCombination[level] = i;
                if (i === 0 && this.nonZeroLetters.has(this.letters[level])) {
                    continue;
                }
                used[i] = true;
                this.permute(level + 1, used);
                used[i] = false;
            }
        }
    }
    isSolution() {
        let sum = 0;
        for (let i = 0; i < this.letters.length; i++) {
            sum += this.letterCounts[i] * this.letterCountCombination[i];
        }
        return sum === 0;
    }
    toSolution() {
        const solution = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = this.letterCountCombination[i];
        }
        return solution;
    }
}
