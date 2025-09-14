export function solve(puzzle: string) {
    const equation: AlphameticsEquation = parse(puzzle);
    const solver = new AlphameticsSolver(equation);
    return solver.solve();
}

function parse(puzzle: string) {
    const [left, right] = puzzle.split(' == ');
    const leftParts = left.split(' + ');
    const rightParts = right.split(' + ');

    return new AlphameticsEquation(leftParts, rightParts);
}

class AlphameticsEquation {
    private readonly lettersWithCount: Map<string, number> = new Map();
    private readonly nonZeroLetters: Set<string> = new Set();

    constructor(left: string[], right: string[]) {
        for (const leftOperand of left) {
            this.processOperand(leftOperand, 1);
        }
        for (const rightOperand of right) {
            this.processOperand(rightOperand, -1);
        }
    }

    getLettersWithCount(): Map<string, number> {
        return this.lettersWithCount;
    }

    getNonZeroLetters(): Set<string> {
        return this.nonZeroLetters;
    }

    private processOperand(operand: string, multiplyCountBy: number): void {
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
    private readonly letters: string[];
    private readonly letterCounts: number[];
    private readonly nonZeroLetters: Set<string>;
    private readonly letterCountCombinationSize: number;

    constructor(private readonly equation: AlphameticsEquation) {
        this.letters = Array.from(equation.getLettersWithCount().keys());
        this.letterCounts = Array.from(equation.getLettersWithCount().values());
        this.nonZeroLetters = equation.getNonZeroLetters();
        this.letterCountCombinationSize = this.letters.length;
    }

    solve(): { [letter: string]: number } | undefined {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const availableDigits: boolean[] = new Array(10).fill(true);
        const combination: number[] = new Array(this.letterCountCombinationSize);

        return this.findSolution(digits, availableDigits, 0, combination);
    }

    private findSolution(digits: number[], availableDigits: boolean[], level: number, combination: number[]): { [letter: string]: number } | undefined {
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


    private isSolution(letterCountCombination: number[]): boolean {
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

    private toSolution(letterCountCombination: number[]): { [letter: string]: number } {
        const solution: { [letter: string]: number } = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = letterCountCombination[i];
        }
        return solution;
    }
}