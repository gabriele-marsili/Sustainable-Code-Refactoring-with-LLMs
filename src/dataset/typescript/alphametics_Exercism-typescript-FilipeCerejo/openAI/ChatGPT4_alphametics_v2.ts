export function solve(puzzle: string) {
    const equation = parse(puzzle);
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
    private lettersWithCount: Map<string, number> = new Map();
    private nonZeroLetters: Set<string> = new Set();

    public get getLettersWithCount(): Map<string, number> {
        return this.lettersWithCount;
    }

    public get getNonZeroLetters(): Set<string> {
        return this.nonZeroLetters;
    }

    constructor(left: string[], right: string[]) {
        left.forEach((operand) => this.processOperand(operand, 1));
        right.forEach((operand) => this.processOperand(operand, -1));
    }

    private processOperand(operand: string, multiplier: number): void {
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
    private letters: string[];
    private letterCounts: number[];

    constructor(private equation: AlphameticsEquation) {
        this.letters = Array.from(equation.getLettersWithCount.keys());
        this.letterCounts = Array.from(equation.getLettersWithCount.values());
    }

    solve(): { [letter: string]: number } | undefined {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const nonZeroLetters = this.equation.getNonZeroLetters;

        return this.permuteAndCheck(digits, this.letters.length, nonZeroLetters);
    }

    private permuteAndCheck(
        digits: number[],
        length: number,
        nonZeroLetters: Set<string>
    ): { [letter: string]: number } | undefined {
        const used = Array(10).fill(false);
        const combination: number[] = [];

        const backtrack = (index: number): { [letter: string]: number } | undefined => {
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
                    if (result) return result;

                    used[digit] = false;
                }
            }
            return undefined;
        };

        return backtrack(0);
    }

    private isSolution(combination: number[]): boolean {
        const sum = this.letterCounts.reduce((acc, count, i) => acc + count * combination[i], 0);
        return sum === 0;
    }

    private toSolution(combination: number[]): { [letter: string]: number } {
        const solution: { [letter: string]: number } = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = combination[i];
        }
        return solution;
    }
}