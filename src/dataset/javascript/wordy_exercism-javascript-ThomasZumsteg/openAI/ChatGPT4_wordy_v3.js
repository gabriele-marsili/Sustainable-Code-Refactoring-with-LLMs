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
		let total = parseInt(tokens.shift(), 10);
		while (tokens.length > 0) {
			const operator = tokens.shift();
			const operand = parseInt(tokens.shift(), 10);
			switch (operator) {
				case '+': total += operand; break;
				case '-': total -= operand; break;
				case '*': total *= operand; break;
				case '/': total /= operand; break;
			}
		}
		return total;
	}
}

class ArgumentError extends Error {}

export default {
	WordProblem: WordProblem,
	ArgumentError: ArgumentError,
};