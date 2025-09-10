class WordProblem {
	constructor(text) {
		this.text = text;
		this.operators = {
			"plus": '+',
			"minus": '-',
			"multiplied by": "*",
			"divided by": "/",
		};
		this.operatorKeys = Object.keys(this.operators);
		this.formRegex = new RegExp("^What is (-?\\d+(?: (?:" + this.operatorKeys.join("|") + ") -?\\d+)+)\\?$");
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
		for (const operator of this.operatorKeys) {
			const regex = new RegExp(operator, "g");
			text = text.replace(regex, this.operators[operator]);
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
					throw new ArgumentError("Invalid operator");
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