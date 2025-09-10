class WordProblem {
    constructor(text) {
        this.text = text;
        this.operators = {
            "plus": '+',
            "minus": '-',
            "multiplied by": "*",
            "divided by": "/",
        };
        this.operatorRegex = new RegExp(Object.keys(this.operators).join("|"), "g");
        this.formRegex = /^What is (-?\d+(?: (?:\+|-) ?\d+)?(?: (?:\*|\/) ?\d+)*)\?$/;
    }

    answer() {
        if (!this.formRegex.test(this.text)) {
            throw new ArgumentError();
        }

        const tokens = this.tokenize();
        return this.process(tokens);
    }

    tokenize() {
        let text = this.text.match(this.formRegex)[1];
        for (const operator in this.operators) {
            if (this.operators.hasOwnProperty(operator)) {
                const replacement = this.operators[operator];
                text = text.replace(new RegExp(operator, "g"), replacement);
            }
        }
        return text.split(" ");
    }

    process(tokens) {
        let total = parseInt(tokens.shift());
        while (tokens.length > 0) {
            const operator = tokens.shift();
            const operand = parseInt(tokens.shift());

            switch (operator) {
                case '+':
                    total += operand;
                    break;
                case '-':
                    total -= operand;
                    break;
                case '*':
                    total *= operand;
                    break;
                case '/':
                    total /= operand;
                    break;
                default:
                    throw new ArgumentError("Invalid operator: " + operator);
            }
        }
        return total;
    }
}

var ArgumentError = function() {}

export default {
    WordProblem: WordProblem,
    ArgumentError: ArgumentError,
}