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
    return new AlphameticsEquation(left.split(' + '), right.split(' + '));
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
        let factor = multiplier;
        for (let i = operand.length - 1; i >= 0; i--) {
            const letter = operand[i];
            this.lettersWithCount.set(letter, (this.lettersWithCount.get(letter) || 0) + factor);
            factor *= 10;
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
        const combinations = this.generatePermutations(digits, this.letters.length);
        for (const combination of combinations) {
            if (this.isSolution(combination)) {
                return this.toSolution(combination);
            }
        }
        return undefined;
    }
    isSolution(combination) {
        const sum = this.letterCounts.reduce((acc, count, i) => acc + count * combination[i], 0);
        if (sum !== 0)
            return false;
        for (let i = 0; i < combination.length; i++) {
            if (combination[i] === 0 && this.equation.getNonZeroLetters.has(this.letters[i])) {
                return false;
            }
        }
        return true;
    }
    toSolution(combination) {
        const solution = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = combination[i];
        }
        return solution;
    }
    generatePermutations(array, k) {
        const result = [];
        const used = Array(array.length).fill(false);
        const current = [];
        const backtrack = (depth) => {
            if (depth === k) {
                result.push([...current]);
                return;
            }
            for (let i = 0; i < array.length; i++) {
                if (!used[i]) {
                    used[i] = true;
                    current.push(array[i]);
                    backtrack(depth + 1);
                    current.pop();
                    used[i] = false;
                }
            }
        };
        backtrack(0);
        return result;
    }
}
