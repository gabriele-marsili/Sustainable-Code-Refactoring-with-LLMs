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
        left.forEach((leftOperand) => this.processOperand(leftOperand, 1));
        right.forEach((rightOperand) => this.processOperand(rightOperand, -1));
    }
    //operand = each number (ABC, ex.) - not each letter
    //multiplyCountBy = decimal place
    processOperand(operand, multiplyCountBy) {
        let letterCount = multiplyCountBy;
        for (let i = operand.length - 1; i >= 0; i--) {
            //starts by C from example
            const letter = operand[i];
            const existingCount = this.lettersWithCount.get(letter) || 0;
            this.lettersWithCount.set(letter, existingCount + letterCount); //1 or 10 or 100 depending on its decimal place - C = 1; B = 10; A = 100
            letterCount *= 10;
        }
        this.nonZeroLetters.add(operand[0]);
    }
}
class AlphameticsSolver {
    constructor(equation) {
        this.equation = equation;
        this.equation = equation;
    }
    solve() {
        const combinations = this.letterCountCombinations();
        const index = combinations.findIndex((combination) => this.isSolution(combination));
        return index === -1 ? undefined : this.toSolution(combinations[index]);
    }
    letterCountCombinations() {
        return this.permutations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], this.equation.getLettersWithCount.size);
    }
    isSolution(letterCountCombination) {
        const letterCounts = Array.from(this.equation.getLettersWithCount.values());
        const sum = letterCounts.reduce((sum, count, index) => sum + count * letterCountCombination[index], 0);
        //returns left hand side equals right hand side
        if (sum !== 0) {
            return false;
        }
        //check if there are no 0 summed equations
        const zeroIndex = letterCountCombination.indexOf(0);
        if (zeroIndex === -1) {
            return true;
        }
        const letterAtZeroIndex = Array.from(this.equation.getLettersWithCount.keys())[zeroIndex];
        return !this.equation.getNonZeroLetters.has(letterAtZeroIndex);
    }
    toSolution(letterCountCombination) {
        const solution = {};
        const letters = Array.from(this.equation.getLettersWithCount.keys());
        for (let i = 0; i < letters.length; i++) {
            solution[letters[i]] = letterCountCombination[i];
        }
        return solution;
    }
    permutations(array, k) {
        const perms = [];
        const combinations = [];
        const indices = [];
        function run(level) {
            for (var i = 0; i < array.length; i++) {
                if (!indices[i]) {
                    indices[i] = true;
                    combinations[level] = array[i];
                    if (level < k - 1) {
                        run(level + 1);
                    }
                    else {
                        perms.push(Array.from(combinations));
                    }
                    indices[i] = false;
                }
            }
        }
        run(0);
        return perms;
    }
}
