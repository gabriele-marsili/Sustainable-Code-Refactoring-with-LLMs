var Bob = function() {};

Bob.prototype.hey = function(input) {
	// Check for empty/whitespace first (most common case)
	if (!input || /^\s*$/.test(input))
		return "Fine. Be that way!";
	
	// Check for question (second most common)
	if (input.endsWith('?') || /\?\s*$/.test(input))
		return "Sure.";
	
	// Check for shouting (least common, most expensive)
	if (input === input.toUpperCase() && /[A-Z]/.test(input))
		return "Whoa, chill out!";
	
	return "Whatever.";
};

export default Bob;