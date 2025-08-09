const HAS_YELL_POSSIBILITY = /[A-Z]/;
const YELL_EXPRESSION = /^[^a-z]+$/;
const YELL_WITH_QUESTION_EXPRESSION = /^[^a-z]*\?$/;
const NO_EXPRESSION = /^\s*$/;

export const hey = message => {
	const trimmed = message.trim();
	
	if (!trimmed) return "Fine. Be that way!";
	
	const hasLetters = HAS_YELL_POSSIBILITY.test(trimmed);
	const isQuestion = trimmed.endsWith('?');
	
	if (hasLetters && YELL_EXPRESSION.test(trimmed)) {
		return isQuestion ? "Calm down, I know what I'm doing!" : "Whoa, chill out!";
	}
	
	return isQuestion ? "Sure." : "Whatever.";
};