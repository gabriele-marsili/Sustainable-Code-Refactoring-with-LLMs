var Bob = function() {};

Bob.prototype.hey = function(input) {
	const trimmed = input.trim();
	if (!trimmed) return "Fine. Be that way!";
	if (trimmed.endsWith('?')) {
		if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) {
			return "Whoa, chill out!";
		}
		return "Sure.";
	}
	if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) {
		return "Whoa, chill out!";
	}
	return "Whatever.";
};

export default Bob;