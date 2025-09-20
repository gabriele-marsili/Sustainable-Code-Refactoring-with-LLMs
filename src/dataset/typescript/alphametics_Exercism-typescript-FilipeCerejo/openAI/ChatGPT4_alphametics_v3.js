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
        left.forEach((operand) => this.processOperand(operand, 1));
        right.forEach((operand) => this.processOperand(operand, -1));
    }
    processOperand(operand, multiplyCountBy) {
        let letterCount = multiplyCountBy;
        for (let i = operand.length - 1; i >= 0; i--) {
            const letter = operand[i];
            this.lettersWithCount.set(letter, (this.lettersWithCount.get(letter) || 0) + letterCount);
            letterCount *= 10;
        }
        this.nonZeroLetters.add(operand[0]);
    }
}
class AlphameticsSolver {
    constructor(equation) {
        this.equation = equation;
    }
    solve() {
        const letters = Array.from(this.equation.getLettersWithCount.keys());
        const letterCounts = Array.from(this.equation.getLettersWithCount.values());
        const nonZeroLetters = this.equation.getNonZeroLetters;
        return this.findSolution(letters, letterCounts, nonZeroLetters);
    }
    findSolution(letters, letterCounts, nonZeroLetters) {
        const digits = Array.from({ length: 10 }, (_, i) => i);
        const used = new Array(10).fill(false);
        const backtrack = (index, currentSum) => {
            if (index === letters.length) {
                return currentSum === 0 ? this.toSolution(letters, letterCounts) : undefined;
            }
            for (let digit of digits) {
                if (used[digit] || (digit === 0 && nonZeroLetters.has(letters[index])))
                    continue;
                used[digit] = true;
                const result = backtrack(index + 1, currentSum + letterCounts[index] * digit);
                if (result)
                    return result;
                used[digit] = false;
            }
            return undefined;
        };
        return backtrack(0, 0);
    }
    toSolution(letters, letterCounts) {
        const solution = {};
        for (let i = 0; i < letters.length; i++) {
            solution[letters[i]] = letterCounts[i];
        }
        return solution;
    }
}
