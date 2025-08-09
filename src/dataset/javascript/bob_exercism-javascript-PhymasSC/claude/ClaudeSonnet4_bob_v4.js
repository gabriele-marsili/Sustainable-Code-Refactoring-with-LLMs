const HAS_YELL_POSSIBILITY = /[A-Z]/;
const YELL_EXPRESSION = /^[^a-z]+$/;
const YELL_WITH_QUESTION_EXPRESSION = /^[^a-z]+\?$/;
const NO_EXPRESSION = /^\s*$/;

export const hey = message => {
	const trimmed = message.trim();
	
	if (!trimmed) return "Fine. Be that way!";
	
	const hasUpperCase = HAS_YELL_POSSIBILITY.test(trimmed);
	const endsWithQuestion = trimmed.endsWith('?');
	
	if (hasUpperCase && YELL_EXPRESSION.test(trimmed)) {
		return endsWithQuestion ? "Calm down, I know what I'm doing!" : "Whoa, chill out!";
	}
	
	return endsWithQuestion ? "Sure." : "Whatever.";
};