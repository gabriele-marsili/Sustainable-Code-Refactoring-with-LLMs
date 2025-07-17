class WordProblem {
	constructor(text) {
		/* Solves mathmatical word problems */
		this.text = text;
		this.operators = {
			"plus": '+',
			"minus": '-',
			"multiplied by": "*",
			"divided by": "/",
		};
		this.form = new RegExp("^What is (-?\\d+(?: (?:" + Object.keys(this.operators).join("|") + ") -?\\d+)+)\\?$");
	}
	answer() {
		/* Answers a mathmatical word problem */
		if (!this.text.match(this.form))
			throw new ArgumentError();
		var tokens = this.tokenize();
		return this.process(tokens);
	}
	tokenize() {
		/* Splits the word problem into javascript tokens */
		var text = this.text.match(this.form)[1];
		for (var operator in this.operators)
			text = text.replace(new RegExp(operator, "g"), this.operators[operator]);
		return text.split(" ");
	}
	process(tokens) {
		/* Evaluates the tokens in sequential order */
		var total = tokens.shift();
		while (tokens.length > 0)
			total = eval(total + " " + tokens.shift() + " " + tokens.shift());
		return total;
	}
}




// An error
var ArgumentError = function() {}

export default {
	WordProblem: WordProblem,
	ArgumentError: ArgumentError,
}
