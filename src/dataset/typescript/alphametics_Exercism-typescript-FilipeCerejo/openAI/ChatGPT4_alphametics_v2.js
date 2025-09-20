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
    processOperand(operand, multiplier) {
        let placeValue = multiplier;
        for (let i = operand.length - 1; i >= 0; i--) {
            const letter = operand[i];
            this.lettersWithCount.set(letter, (this.lettersWithCount.get(letter) || 0) + placeValue);
            placeValue *= 10;
        }
        this.nonZeroLetters.add(operand[0]);
    }
}
class AlphameticsSolver {
    constructor(equation) {
        this.equation = equation;
        this.letters = Array.from(equation.getLettersWithCount.keys());
        this.letterCounts = Array.from(equation.getLettersWithCount.values());
    }
    solve() {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const nonZeroLetters = this.equation.getNonZeroLetters;
        return this.permuteAndCheck(digits, this.letters.length, nonZeroLetters);
    }
    permuteAndCheck(digits, length, nonZeroLetters) {
        const used = Array(10).fill(false);
        const combination = [];
        const backtrack = (index) => {
            if (index === length) {
                if (this.isSolution(combination)) {
                    return this.toSolution(combination);
                }
                return undefined;
            }
            for (let digit = 0; digit < digits.length; digit++) {
                if (!used[digit] && (digit !== 0 || !nonZeroLetters.has(this.letters[index]))) {
                    used[digit] = true;
                    combination[index] = digits[digit];
                    const result = backtrack(index + 1);
                    if (result)
                        return result;
                    used[digit] = false;
                }
            }
            return undefined;
        };
        return backtrack(0);
    }
    isSolution(combination) {
        const sum = this.letterCounts.reduce((acc, count, i) => acc + count * combination[i], 0);
        return sum === 0;
    }
    toSolution(combination) {
        const solution = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = combination[i];
        }
        return solution;
    }
}
