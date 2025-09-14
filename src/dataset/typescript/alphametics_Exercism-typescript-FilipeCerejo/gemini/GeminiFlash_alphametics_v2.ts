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
    private lettersWithCount: Map<string, number>;
    private nonZeroLetters: Set<string>;
    private letterArray: string[];

    constructor(left: string[], right: string[]) {
        this.lettersWithCount = new Map();
        this.nonZeroLetters = new Set();

        left.forEach((leftOperand: string) => this.processOperand(leftOperand, 1));
        right.forEach((rightOperand: string) => this.processOperand(rightOperand, -1));

        this.letterArray = Array.from(this.lettersWithCount.keys());
    }

    getLettersWithCountValues(): number[] {
        return Array.from(this.lettersWithCount.values());
    }

    getNonZeroLetters(): Set<string> {
        return this.nonZeroLetters;
    }

    getLetterArray(): string[] {
        return this.letterArray;
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
    private letterCounts: number[];
    private letters: string[];
    private nonZeroLetters: Set<string>;
    private letterCountSize: number;

    constructor(private equation: AlphameticsEquation) {
        this.letterCounts = equation.getLettersWithCountValues();
        this.letters = equation.getLetterArray();
        this.nonZeroLetters = equation.getNonZeroLetters();
        this.letterCountSize = this.letters.length;
    }

    solve(): { [letter: string]: number } | undefined {
        const combination = this.findSolution();
        return combination;
    }

    findSolution(): { [letter: string]: number } | undefined {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const availableDigits = new Array(10).fill(true);
        const assignment: number[] = new Array(this.letterCountSize).fill(-1);

        function backtrack(index: number): boolean {
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
            const solution: { [letter: string]: number } = {};
            for (let i = 0; i < this.letters.length; i++) {
                solution[this.letters[i]] = assignment[i];
            }
            return solution;
        }

        return undefined;
    }

    isSolution(letterCountCombination: number[]): boolean {
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