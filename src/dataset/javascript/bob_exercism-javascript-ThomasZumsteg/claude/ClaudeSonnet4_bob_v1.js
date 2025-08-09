var Bob = function() {};

Bob.prototype.hey = function(input) {
	// Cache trimmed input to avoid multiple operations
	const trimmed = input.trim();
	
	// Nothing (empty or whitespace only)
	if (!trimmed) {
		return "Fine. Be that way!";
	}
	
	// Check if it's a question (ends with ?)
	const isQuestion = trimmed.endsWith('?');
	
	// Check if shouting (has letters and all uppercase)
	const hasLetters = /[A-Z]/i.test(trimmed);
	const isShouting = hasLetters && trimmed === trimmed.toUpperCase();
	
	if (isShouting) {
		return "Whoa, chill out!";
	}
	
	if (isQuestion) {
		return "Sure.";
	}
	
	return "Whatever.";
};

export default Bob;