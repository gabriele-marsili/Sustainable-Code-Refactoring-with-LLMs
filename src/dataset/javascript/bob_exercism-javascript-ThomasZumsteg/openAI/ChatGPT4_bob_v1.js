var Bob = function() {};

Bob.prototype.hey = function(input) {
	const trimmed = input.trim();

	if (!trimmed)
		return "Fine. Be that way!";

	const isShouting = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
	if (isShouting)
		return "Whoa, chill out!";

	if (trimmed.endsWith('?'))
		return "Sure.";

	return "Whatever.";
};

export default Bob;