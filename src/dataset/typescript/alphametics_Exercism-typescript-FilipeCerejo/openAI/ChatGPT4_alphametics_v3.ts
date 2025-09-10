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

    private processOperand(operand: string, multiplyCountBy: number): void {
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
    constructor(private equation: AlphameticsEquation) {}

    solve(): { [letter: string]: number } | undefined {
        const letters = Array.from(this.equation.getLettersWithCount.keys());
        const letterCounts = Array.from(this.equation.getLettersWithCount.values());
        const nonZeroLetters = this.equation.getNonZeroLetters;

        return this.findSolution(letters, letterCounts, nonZeroLetters);
    }

    private findSolution(
        letters: string[],
        letterCounts: number[],
        nonZeroLetters: Set<string>
    ): { [letter: string]: number } | undefined {
        const digits = Array.from({ length: 10 }, (_, i) => i);
        const used = new Array(10).fill(false);

        const backtrack = (index: number, currentSum: number): { [letter: string]: number } | undefined => {
            if (index === letters.length) {
                return currentSum === 0 ? this.toSolution(letters, letterCounts) : undefined;
            }

            for (let digit of digits) {
                if (used[digit] || (digit === 0 && nonZeroLetters.has(letters[index]))) continue;

                used[digit] = true;
                const result = backtrack(index + 1, currentSum + letterCounts[index] * digit);
                if (result) return result;
                used[digit] = false;
            }

            return undefined;
        };

        return backtrack(0, 0);
    }

    private toSolution(letters: string[], letterCounts: number[]): { [letter: string]: number } {
        const solution: { [letter: string]: number } = {};
        for (let i = 0; i < letters.length; i++) {
            solution[letters[i]] = letterCounts[i];
        }
        return solution;
    }
}