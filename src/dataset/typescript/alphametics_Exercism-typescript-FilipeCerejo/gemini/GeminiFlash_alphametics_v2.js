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
        left.forEach((leftOperand) => this.processOperand(leftOperand, 1));
        right.forEach((rightOperand) => this.processOperand(rightOperand, -1));
        this.letterArray = Array.from(this.lettersWithCount.keys());
    }
    getLettersWithCountValues() {
        return Array.from(this.lettersWithCount.values());
    }
    getNonZeroLetters() {
        return this.nonZeroLetters;
    }
    getLetterArray() {
        return this.letterArray;
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
        this.letterCounts = equation.getLettersWithCountValues();
        this.letters = equation.getLetterArray();
        this.nonZeroLetters = equation.getNonZeroLetters();
        this.letterCountSize = this.letters.length;
    }
    solve() {
        const combination = this.findSolution();
        return combination;
    }
    findSolution() {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const availableDigits = new Array(10).fill(true);
        const assignment = new Array(this.letterCountSize).fill(-1);
        function backtrack(index) {
            if (index === this.letterCountSize) {
                if (this.isSolution(assignment)) {
                    return true;
                }
                return false;
            }
            for (let i = 0; i < digits.length; i++) {
                if (availableDigits[i]) {
                    assignment[index] = digits[i];
                    availableDigits[i] = false;
                    if (backtrack.call(this, index + 1)) {
                        return true;
                    }
                    availableDigits[i] = true;
                    assignment[index] = -1;
                }
            }
            return false;
        }
        const solutionFound = backtrack.call(this, 0);
        if (solutionFound) {
            const solution = {};
            for (let i = 0; i < this.letters.length; i++) {
                solution[this.letters[i]] = assignment[i];
            }
            return solution;
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
}
