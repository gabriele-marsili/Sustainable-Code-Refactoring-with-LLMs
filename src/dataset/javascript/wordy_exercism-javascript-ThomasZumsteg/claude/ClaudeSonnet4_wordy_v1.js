class WordProblem {
	constructor(text) {
		/* Solves mathmatical word problems */
		this.text = text;
		this.operators = new Map([
			["plus", '+'],
			["minus", '-'],
			["multiplied by", "*"],
			["divided by", "/"]
		]);
		this.operatorKeys = Array.from(this.operators.keys());
		this.form = new RegExp("^What is (-?\\d+(?: (?:" + this.operatorKeys.join("|") + ") -?\\d+)+)\\?$");
	}
	answer() {
		/* Answers a mathmatical word problem */
		const match = this.text.match(this.form);
		if (!match)
			throw new ArgumentError();
		const tokens = this.tokenize(match[1]);
		return this.process(tokens);
	}
	tokenize(text) {
		/* Splits the word problem into javascript tokens */
		for (const operator of this.operatorKeys) {
			if (text.includes(operator)) {
				text = text.replaceAll(operator, this.operators.get(operator));
			}
		}
		return text.split(" ");
	}
	process(tokens) {
		/* Evaluates the tokens in sequential order */
		let total = parseFloat(tokens[0]);
		for (let i = 1; i < tokens.length; i += 2) {
			const operator = tokens[i];
			const operand = parseFloat(tokens[i + 1]);
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

// An error
var ArgumentError = function() {}

export default {
	WordProblem: WordProblem,
	ArgumentError: ArgumentError,
}