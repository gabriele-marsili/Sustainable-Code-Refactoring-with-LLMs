export function solve(puzzle: string) {
    const equation = parse(puzzle);
    return new AlphameticsSolver(equation).solve();
}

function parse(puzzle: string) {
    const [left, right] = puzzle.split(' == ');
    return new AlphameticsEquation(left.split(' + '), right.split(' + '));
}

class AlphameticsEquation {
    private lettersWithCount = new Map<string, number>();
    private nonZeroLetters = new Set<string>();

    public get getLettersWithCount() {
        return this.lettersWithCount;
    }

    public get getNonZeroLetters() {
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
    constructor(private equation: AlphameticsEquation) {}

    solve(): { [letter: string]: number } | undefined {
        const letters = Array.from(this.equation.getLettersWithCount.keys());
        const letterCounts = Array.from(this.equation.getLettersWithCount.values());
        const nonZeroLetters = this.equation.getNonZeroLetters;

        const isSolution = (combination: number[]): boolean => {
            const sum = letterCounts.reduce((acc, count, i) => acc + count * combination[i], 0);
            if (sum !== 0) return false;
            return !combination.some((value, i) => value === 0 && nonZeroLetters.has(letters[i]));
        };

        const toSolution = (combination: number[]): { [letter: string]: number } =>
            letters.reduce((acc, letter, i) => {
                acc[letter] = combination[i];
                return acc;
            }, {} as { [letter: string]: number });

        for (const combination of this.permutations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], letters.length)) {
            if (isSolution(combination)) return toSolution(combination);
        }
        return undefined;
    }

    private permutations(array: number[], k: number): number[][] {
        const results: number[][] = [];
        const used = Array(array.length).fill(false);
        const current: number[] = [];

        const generate = (depth: number) => {
            if (depth === k) {
                results.push([...current]);
                return;
            }
            for (let i = 0; i < array.length; i++) {
                if (!used[i]) {
                    used[i] = true;
                    current.push(array[i]);
                    generate(depth + 1);
                    current.pop();
                    used[i] = false;
                }
            }
        };

        generate(0);
        return results;
    }
}