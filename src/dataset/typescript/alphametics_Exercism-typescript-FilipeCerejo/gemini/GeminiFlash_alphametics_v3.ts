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
        this.lettersWithCount = new Map();
        this.nonZeroLetters = new Set();

        this.processOperands(left, 1);
        this.processOperands(right, -1);
    }

    private processOperands(operands: string[], multiplyCountBy: number): void {
        for (const operand of operands) {
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
    private solution: { [letter: string]: number } | undefined;

    constructor(private equation: AlphameticsEquation) {
        const lettersWithCount = equation.getLettersWithCount();
        this.letters = Array.from(lettersWithCount.keys());
        this.letterCounts = Array.from(lettersWithCount.values());
        this.nonZeroLetters = equation.getNonZeroLetters();
    }

    solve(): { [letter: string]: number } | undefined {
        this.solution = undefined;
        this.permute(0, new Array<boolean>(10).fill(false));
        return this.solution;
    }

    private permute(level: number, used: boolean[]): void {
        if (this.solution) {
            return;
        }

        if (level === this.letters.length) {
            if (this.isSolution()) {
                this.solution = this.toSolution();
            }
            return;
        }

        for (let i = 0; i < 10; i++) {
            if (!used[i]) {
                this.letterCountCombination[level] = i;
                if (i === 0 && this.nonZeroLetters.has(this.letters[level])) {
                    continue;
                }
                used[i] = true;
                this.permute(level + 1, used);
                used[i] = false;
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

    private toSolution(): { [letter: string]: number } {
        const solution: { [letter: string]: number } = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = this.letterCountCombination[i];
        }
        return solution;
    }
}