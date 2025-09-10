class WordProblem {
	constructor(text) {
		this.text = text;
		this.operators = {
			"plus": '+',
			"minus": '-',
			"multiplied by": '*',
			"divided by": '/',
		};
		this.form = new RegExp(`^What is (-?\\d+(?: (?:${Object.keys(this.operators).join("|")}) -?\\d+)+)\\?$`);
	}
	answer() {
		if (!this.form.test(this.text)) throw new ArgumentError();
		const tokens = this.tokenize();
		return this.process(tokens);
	}
	tokenize() {
		let text = this.text.match(this.form)[1];
		for (const [operator, symbol] of Object.entries(this.operators)) {
			text = text.split(operator).join(symbol);
		}
		return text.split(" ");
	}
	process(tokens) {
		return tokens.reduce((total, token, index) => {
			if (index % 2 === 1) {
				const operator = token;
				const operand = tokens[index + 1];
				total = new Function(`return ${total} ${operator} ${operand}`)();
			}
			return total;
		}, parseFloat(tokens[0]));
	}
}

class ArgumentError extends Error {}

export default {
	WordProblem,
	ArgumentError,
};