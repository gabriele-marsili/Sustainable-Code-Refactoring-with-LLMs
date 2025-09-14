class WordProblem {
	constructor(text) {
		this.text = text;
		this.operators = new Map([
			["plus", '+'],
			["minus", '-'],
			["multiplied by", "*"],
			["divided by", "/"]
		]);
		this.operatorPattern = "plus|minus|multiplied by|divided by";
		this.form = /^What is (-?\d+(?:\s(?:plus|minus|multiplied by|divided by)\s-?\d+)+)\?$/;
	}
	
	answer() {
		const match = this.text.match(this.form);
		if (!match) {
			throw new ArgumentError();
		}
		const tokens = this.tokenize(match[1]);
		return this.process(tokens);
	}
	
	tokenize(text) {
		const tokens = [];
		const parts = text.split(/\s+/);
		
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (this.operators.has(part)) {
				tokens.push(this.operators.get(part));
			} else if (part === "multiplied" && parts[i + 1] === "by") {
				tokens.push("*");
				i++;
			} else if (part === "divided" && parts[i + 1] === "by") {
				tokens.push("/");
				i++;
			} else {
				tokens.push(parseFloat(part));
			}
		}
		return tokens;
	}
	
	process(tokens) {
		let result = tokens[0];
		for (let i = 1; i < tokens.length; i += 2) {
			const operator = tokens[i];
			const operand = tokens[i + 1];
			
			switch (operator) {
				case '+':
					result += operand;
					break;
				case '-':
					result -= operand;
					break;
				case '*':
					result *= operand;
					break;
				case '/':
					result /= operand;
					break;
			}
		}
		return result;
	}
}

const ArgumentError = function() {};

export default {
	WordProblem: WordProblem,
	ArgumentError: ArgumentError,
};