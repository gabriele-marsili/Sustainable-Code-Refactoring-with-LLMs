class WordProblem {
	constructor(text) {
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
		const match = this.text.match(this.form);
		if (!match) throw new ArgumentError();
		
		let text = match[1];
		for (const [operator, symbol] of this.operators) {
			if (text.includes(operator)) {
				text = text.replaceAll(operator, symbol);
			}
		}
		
		const tokens = text.split(" ");
		let result = parseFloat(tokens[0]);
		
		for (let i = 1; i < tokens.length; i += 2) {
			const operator = tokens[i];
			const operand = parseFloat(tokens[i + 1]);
			
			switch (operator) {
				case '+': result += operand; break;
				case '-': result -= operand; break;
				case '*': result *= operand; break;
				case '/': result /= operand; break;
			}
		}
		
		return result;
	}
}

class ArgumentError extends Error {}

export default {
	WordProblem: WordProblem,
	ArgumentError: ArgumentError,
}