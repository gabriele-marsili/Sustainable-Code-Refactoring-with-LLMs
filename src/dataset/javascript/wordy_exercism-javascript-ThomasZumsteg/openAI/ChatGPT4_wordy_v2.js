class WordProblem {
	constructor(text) {
		this.text = text;
		this.operators = {
			"plus": (a, b) => a + b,
			"minus": (a, b) => a - b,
			"multiplied by": (a, b) => a * b,
			"divided by": (a, b) => a / b,
		};
		this.form = new RegExp(`^What is (-?\\d+(?: (?:${Object.keys(this.operators).join("|")}) -?\\d+)+)\\?$`);
	}
	answer() {
		if (!this.form.test(this.text)) throw new ArgumentError();
		const tokens = this.tokenize();
		return this.process(tokens);
	}
	tokenize() {
		const text = this.text.match(this.form)[1];
		return text.split(/ (plus|minus|multiplied by|divided by) /);
	}
	process(tokens) {
		let total = parseInt(tokens[0], 10);
		for (let i = 1; i < tokens.length; i += 2) {
			const operator = this.operators[tokens[i]];
			const operand = parseInt(tokens[i + 1], 10);
			total = operator(total, operand);
		}
		return total;
	}
}

class ArgumentError extends Error {}

export default {
	WordProblem,
	ArgumentError,
};