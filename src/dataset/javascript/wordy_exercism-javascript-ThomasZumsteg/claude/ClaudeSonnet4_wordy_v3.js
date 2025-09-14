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
		this.form = /^What is (-?\d+(?:\s+(?:plus|minus|multiplied by|divided by)\s+-?\d+)+)\?$/;
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
		let current = '';
		let i = 0;
		
		while (i < text.length) {
			if (text[i] === ' ') {
				if (current) {
					if (this.operators.has(current)) {
						tokens.push(this.operators.get(current));
					} else {
						tokens.push(current);
					}
					current = '';
				}
				i++;
			} else if (text.substr(i, 13) === 'multiplied by') {
				if (current) {
					tokens.push(current);
					current = '';
				}
				tokens.push('*');
				i += 13;
			} else if (text.substr(i, 10) === 'divided by') {
				if (current) {
					tokens.push(current);
					current = '';
				}
				tokens.push('/');
				i += 10;
			} else if (text.substr(i, 4) === 'plus') {
				if (current) {
					tokens.push(current);
					current = '';
				}
				tokens.push('+');
				i += 4;
			} else if (text.substr(i, 5) === 'minus') {
				if (current) {
					tokens.push(current);
					current = '';
				}
				tokens.push('-');
				i += 5;
			} else {
				current += text[i];
				i++;
			}
		}
		
		if (current) {
			tokens.push(current);
		}
		
		return tokens.filter(token => token !== '');
	}
	
	process(tokens) {
		let result = parseFloat(tokens[0]);
		
		for (let i = 1; i < tokens.length; i += 2) {
			const operator = tokens[i];
			const operand = parseFloat(tokens[i + 1]);
			
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

const ArgumentError = function() {}

export default {
	WordProblem: WordProblem,
	ArgumentError: ArgumentError,
}