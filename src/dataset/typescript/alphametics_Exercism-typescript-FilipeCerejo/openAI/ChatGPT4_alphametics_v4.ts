export function solve(puzzle: string) {
    const equation = parse(puzzle);
    const solver = new AlphameticsSolver(equation);
    return solver.solve();
}

function parse(puzzle: string) {
    const [left, right] = puzzle.split(' == ');
    return new AlphameticsEquation(left.split(' + '), right.split(' + '));
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
    private letters: string[];
    private letterCounts: number[];

    constructor(private equation: AlphameticsEquation) {
        this.letters = Array.from(equation.getLettersWithCount.keys());
        this.letterCounts = Array.from(equation.getLettersWithCount.values());
    }

    solve(): { [letter: string]: number } | undefined {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const combinations = this.generatePermutations(digits, this.letters.length);

        for (const combination of combinations) {
            if (this.isSolution(combination)) {
                return this.toSolution(combination);
            }
        }
        return undefined;
    }

    private isSolution(combination: number[]): boolean {
        const sum = this.letterCounts.reduce((acc, count, i) => acc + count * combination[i], 0);
        if (sum !== 0) return false;

        for (let i = 0; i < combination.length; i++) {
            if (combination[i] === 0 && this.equation.getNonZeroLetters.has(this.letters[i])) {
                return false;
            }
        }
        return true;
    }

    private toSolution(combination: number[]): { [letter: string]: number } {
        const solution: { [letter: string]: number } = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = combination[i];
        }
        return solution;
    }

    private generatePermutations(array: number[], k: number): number[][] {
        const result: number[][] = [];
        const used: boolean[] = Array(array.length).fill(false);
        const current: number[] = [];

        const backtrack = (depth: number) => {
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