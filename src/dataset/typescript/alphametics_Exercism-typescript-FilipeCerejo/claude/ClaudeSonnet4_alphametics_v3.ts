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
    private letters: string[];
    private letterCounts: number[];
    private nonZeroIndices: Set<number>;

    constructor(private equation: AlphameticsEquation) {
        this.letters = Array.from(equation.getLettersWithCount.keys());
        this.letterCounts = this.letters.map(letter => equation.getLettersWithCount.get(letter)!);
        this.nonZeroIndices = new Set();
        
        for (let i = 0; i < this.letters.length; i++) {
            if (equation.getNonZeroLetters.has(this.letters[i])) {
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

    letterCountCombinations(): number[][] {
        return this.permutations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], this.equation.getLettersWithCount.size);
    }

    isSolution(letterCountCombination: number[]): boolean {
        let sum = 0;
        for (let i = 0; i < this.letterCounts.length; i++) {
            sum += this.letterCounts[i] * letterCountCombination[i];
        }
        return sum === 0;
    }

    toSolution(letterCountCombination: number[]): { [letter: string]: number } {
        const solution: { [letter: string]: number } = {};
        for (let i = 0; i < this.letters.length; i++) {
            solution[this.letters[i]] = letterCountCombination[i];
        }
        return solution;
    }

    permutations(array: number[], k: number) {
        const perms: number[][] = [];
        const combinations: number[] = new Array(k);
        const indices: boolean[] = new Array(array.length).fill(false);

        const run = (level: number) => {
            if (level === k) {
                perms.push([...combinations]);
                return;
            }
            
            for (let i = 0; i < array.length; i++) {
                if (!indices[i]) {
                    indices[i] = true;
                    combinations[level] = array[i];
                    run(level + 1);
                    indices[i] = false;
                }
            }
        };
        
        run(0);
        return perms;
    }
}