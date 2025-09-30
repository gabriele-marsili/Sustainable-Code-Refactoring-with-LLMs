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
        for (const leftOperand of left) {
            this.processOperand(leftOperand, 1);
        }
        for (const rightOperand of right) {
            this.processOperand(rightOperand, -1);
        }
    }
    processOperand(operand, multiplyCountBy) {
        let letterCount = multiplyCountBy;
        for (let i = operand.length - 1; i >= 0; i--) {
            const letter = operand[i];
            const existingCount = this.lettersWithCount.get(letter) || 0;
            this.lettersWithCount.set(letter, existingCount + letterCount);
            letterCount *= 10;
        }
        this.nonZeroLetters.add(operand[0]);
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
        this.solution = {};
        this.foundSolution = undefined;
        this.letters = Array.from(equation.getLettersWithCount().keys());
        this.letterCounts = Array.from(equation.getLettersWithCount().values());
        this.nonZeroLetters = equation.getNonZeroLetters();
    }
    solve() {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const usedDigits = new Array(10).fill(false);
        this.foundSolution = undefined;
        this.permute(0, digits, usedDigits);
        return this.foundSolution;
    }
    permute(index, digits, usedDigits) {
        if (this.foundSolution)
            return;
        if (index === this.letters.length) {
            if (this.isSolution()) {
                this.foundSolution = Object.assign({}, this.solution);
            }
            return;
        }
        for (let i = 0; i < digits.length; i++) {
            if (!usedDigits[i]) {
                const digit = digits[i];
                if (digit === 0 && this.nonZeroLetters.has(this.letters[index]))
                    continue;
                this.letterCountCombination[index] = digit;
                this.solution[this.letters[index]] = digit;
                usedDigits[i] = true;
                this.permute(index + 1, digits, usedDigits);
                usedDigits[i] = false;
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
}
