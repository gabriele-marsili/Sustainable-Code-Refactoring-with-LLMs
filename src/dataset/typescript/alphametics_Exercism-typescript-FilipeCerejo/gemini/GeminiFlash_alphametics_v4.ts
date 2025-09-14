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

    constructor(left: string[], right: string[]) {
        this.lettersWithCount = new Map<string, number>();
        this.nonZeroLetters = new Set<string>();

        for (const leftOperand of left) {
            this.processOperand(leftOperand, 1);
        }
        for (const rightOperand of right) {
            this.processOperand(rightOperand, -1);
        }
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

    public getLettersWithCount(): Map<string, number> {
        return this.lettersWithCount;
    }

    public getNonZeroLetters(): Set<string> {
        return this.nonZeroLetters;
    }
}

class AlphameticsSolver {
    private letters: string[];
    private letterCounts: number[];
    private nonZeroLetters: Set<string>;
    private letterCountCombination: number[] = [];
    private solution: { [letter: string]: number } = {};
    private foundSolution: { [letter: string]: number } | undefined = undefined;

    constructor(private equation: AlphameticsEquation) {
        this.letters = Array.from(equation.getLettersWithCount().keys());
        this.letterCounts = Array.from(equation.getLettersWithCount().values());
        this.nonZeroLetters = equation.getNonZeroLetters();
    }

    solve(): { [letter: string]: number } | undefined {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const usedDigits: boolean[] = new Array(10).fill(false);
        this.foundSolution = undefined;
        this.permute(0, digits, usedDigits);
        return this.foundSolution;
    }

    private permute(index: number, digits: number[], usedDigits: boolean[]): void {
        if (this.foundSolution) return;

        if (index === this.letters.length) {
            if (this.isSolution()) {
                this.foundSolution = { ...this.solution };
            }
            return;
        }

        for (let i = 0; i < digits.length; i++) {
            if (!usedDigits[i]) {
                const digit = digits[i];
                if (digit === 0 && this.nonZeroLetters.has(this.letters[index])) continue;

                this.letterCountCombination[index] = digit;
                this.solution[this.letters[index]] = digit;
                usedDigits[i] = true;

                this.permute(index + 1, digits, usedDigits);

                usedDigits[i] = false;
            }
        }
    }

    private isSolution(): boolean {
        let sum = 0;
        for (let i = 0; i < this.letters.length; i++) {
            sum += this.letterCounts[i] * this.letterCountCombination[i];
        }
        return sum === 0;
    }
}