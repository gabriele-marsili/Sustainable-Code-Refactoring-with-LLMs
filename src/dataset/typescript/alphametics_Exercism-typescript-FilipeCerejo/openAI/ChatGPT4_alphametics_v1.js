"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solve = solve;
function solve(puzzle) {
    const equation = parse(puzzle);
    return new AlphameticsSolver(equation).solve();
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
    }
    solve() {
        const letters = Array.from(this.equation.getLettersWithCount.keys());
        const letterCounts = Array.from(this.equation.getLettersWithCount.values());
        const nonZeroLetters = this.equation.getNonZeroLetters;
        const isSolution = (combination) => {
            const sum = letterCounts.reduce((acc, count, i) => acc + count * combination[i], 0);
            if (sum !== 0)
                return false;
            return !combination.some((value, i) => value === 0 && nonZeroLetters.has(letters[i]));
        };
        const toSolution = (combination) => letters.reduce((acc, letter, i) => {
            acc[letter] = combination[i];
            return acc;
        }, {});
        for (const combination of this.permutations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], letters.length)) {
            if (isSolution(combination))
                return toSolution(combination);
        }
        return undefined;
    }
    permutations(array, k) {
        const results = [];
        const used = Array(array.length).fill(false);
        const current = [];
        const generate = (depth) => {
            if (depth === k) {
                results.push([...current]);
                return;
            }
            for (let i = 0; i < array.length; i++) {
                if (!used[i]) {
                    used[i] = true;
                    current.push(array[i]);
                    generate(depth + 1);
                    current.pop();
                    used[i] = false;
                }
            }
        };
        generate(0);
        return results;
    }
}
