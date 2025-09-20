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
    getLettersWithCount() {
        return this.lettersWithCount;
    }
    getNonZeroLetters() {
        return this.nonZeroLetters;
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
}
class AlphameticsSolver {
    constructor(equation) {
        this.equation = equation;
        this.letters = Array.from(equation.getLettersWithCount().keys());
        this.letterCounts = Array.from(equation.getLettersWithCount().values());
        this.nonZeroLetters = equation.getNonZeroLetters();
        this.letterCountCombinationSize = this.letters.length;
    }
    solve() {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const availableDigits = new Array(10).fill(true);
        const combination = new Array(this.letterCountCombinationSize);
        return this.findSolution(digits, availableDigits, 0, combination);
    }
    findSolution(digits, availableDigits, level, combination) {
        if (level === this.letterCountCombinationSize) {
            if (this.isSolution(combination)) {
                return this.toSolution(combination);
            }
            return undefined;
        }
        for (let i = 0; i < digits.length; i++) {
            if (availableDigits[i]) {
                availableDigits[i] = false;
                combination[level] = digits[i];
                const solution = this.findSolution(digits, availableDigits, level + 1, combination);
                if (solution) {
                    return solution;
                }
                availableDigits[i] = true;
            }
        }
        return undefined;
    }
    isSolution(letterCountCombination) {
        let sum = 0;
        for (let i = 0; i < this.letterCounts.length; i++) {
            sum += this.letterCounts[i] * letterCountCombination[i];
        }
        if (sum !== 0) {
            return false;
        }
        for (let i = 0; i < letterCountCombination.length; i++) {
            if (letterCountCombination[i] === 0 && this.nonZeroLetters.has(this.letters[i])) {
                return false;
            }
        }
        return true;
    }
    toSolution(letterCountCombination) {
        const solution = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = letterCountCombination[i];
        }
        return solution;
    }
}
