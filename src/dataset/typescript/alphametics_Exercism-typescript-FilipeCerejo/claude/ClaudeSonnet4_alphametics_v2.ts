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

    public get getLettersWithCount(): Map<string, number> {
        return this.lettersWithCount;
    }

    public get getNonZeroLetters(): Set<string> {
        return this.nonZeroLetters;
    }

    constructor(left: string[], right: string[]) {
        this.lettersWithCount = new Map();
        this.nonZeroLetters = new Set();

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
}

class AlphameticsSolver {
    private letterCounts: number[];
    private letters: string[];
    private nonZeroIndices: Set<number>;

    constructor(private equation: AlphameticsEquation) {
        this.letterCounts = Array.from(this.equation.getLettersWithCount.values());
        this.letters = Array.from(this.equation.getLettersWithCount.keys());
        this.nonZeroIndices = new Set();
        
        for (let i = 0; i < this.letters.length; i++) {
            if (this.equation.getNonZeroLetters.has(this.letters[i])) {
                this.nonZeroIndices.add(i);
            }
        }
    }

    solve(): { [letter: string]: number } | undefined {
        const used = new Array(10).fill(false);
        const assignment = new Array(this.letters.length);
        
        if (this.backtrack(0, used, assignment)) {
            const solution: { [letter: string]: number } = {};
            for (let i = 0; i < this.letters.length; i++) {
                solution[this.letters[i]] = assignment[i];
            }
            return solution;
        }
        
        return undefined;
    }

    private backtrack(index: number, used: boolean[], assignment: number[]): boolean {
        if (index === this.letters.length) {
            return this.isSolution(assignment);
        }

        const startDigit = this.nonZeroIndices.has(index) ? 1 : 0;
        
        for (let digit = startDigit; digit <= 9; digit++) {
            if (!used[digit]) {
                used[digit] = true;
                assignment[index] = digit;
                
                if (this.backtrack(index + 1, used, assignment)) {
                    return true;
                }
                
                used[digit] = false;
            }
        }
        
        return false;
    }

    private isSolution(assignment: number[]): boolean {
        let sum = 0;
        for (let i = 0; i < this.letterCounts.length; i++) {
            sum += this.letterCounts[i] * assignment[i];
        }
        return sum === 0;
    }
}