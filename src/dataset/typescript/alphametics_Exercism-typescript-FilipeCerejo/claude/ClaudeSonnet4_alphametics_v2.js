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
    get getLettersWithCount() {
        return this.lettersWithCount;
    }
    get getNonZeroLetters() {
        return this.nonZeroLetters;
    }
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
}
class AlphameticsSolver {
    constructor(equation) {
        this.equation = equation;
        this.letterCounts = Array.from(this.equation.getLettersWithCount.values());
        this.letters = Array.from(this.equation.getLettersWithCount.keys());
        this.nonZeroIndices = new Set();
        for (let i = 0; i < this.letters.length; i++) {
            if (this.equation.getNonZeroLetters.has(this.letters[i])) {
                this.nonZeroIndices.add(i);
            }
        }
    }
    solve() {
        const used = new Array(10).fill(false);
        const assignment = new Array(this.letters.length);
        if (this.backtrack(0, used, assignment)) {
            const solution = {};
            for (let i = 0; i < this.letters.length; i++) {
                solution[this.letters[i]] = assignment[i];
            }
            return solution;
        }
        return undefined;
    }
    backtrack(index, used, assignment) {
        if (index === this.letters.length) {
            return this.isSolution(assignment);
        }
        const startDigit = this.nonZeroIndices.has(index) ? 1 : 0;
        for (let digit = startDigit; digit <= 9; digit++) {
            if (!used[digit]) {
                used[digit] = true;
                assignment[index] = digit;
                if (this.backtrack(index + 1, used, assignment)) {
                    return true;
                }
                used[digit] = false;
            }
        }
        return false;
    }
    isSolution(assignment) {
        let sum = 0;
        for (let i = 0; i < this.letterCounts.length; i++) {
            sum += this.letterCounts[i] * assignment[i];
        }
        return sum === 0;
    }
}
