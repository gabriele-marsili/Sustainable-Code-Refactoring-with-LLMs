//
// This is only a SKELETON file for the 'Bob' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

// Optimized Regular Expressions:
// - Removed the 'g' flag from regexes as it's not needed for single match/test and can affect performance
//   if the regex object is reused without resetting lastIndex, or if match() is used (returns array).
// - Changed NO_EXPRESSION to a more standard and robust pattern for empty or whitespace-only strings.
const HAS_YELL_POSSIBILITY = /[A-Z]/;
const YELL_EXPRESSION = /^[^a-z]+$/;
const YELL_WITH_QUESITON_EXPRESSION = /^[^(a-z?)]+\?$/;
const NO_EXPRESSION = /^\s*$/; // Matches empty string or any amount of whitespace

export const hey = message => {
	// Trim the message once at the beginning if needed for multiple checks.
	// This avoids creating new string objects repeatedly.
	const trimmedMessage = message.trim();

	// 1. Silence Check
	// Using RegExp.prototype.test() is generally more performant than String.prototype.match()
	// when only a boolean result is needed, as it avoids creating an array of matches.
	// This check is performed on the original 'message' as per the skeleton's behavior.
	if (NO_EXPRESSION.test(message)) {
		return "Fine. Be that way!";
	}

	// Determine if the message contains any uppercase letters.
	// This condition gates the "yelling" responses, consistent with the original logic.
	// This check is performed on the original 'message' as per the skeleton's behavior.
	const messageHasUpperCase = HAS_YELL_POSSIBILITY.test(message);

	if (messageHasUpperCase) {
		// 2a. Yelling with Question Check
		// This requires both the presence of an uppercase letter (checked above) AND
		// matching the specific "yelling question" regex.
		// The regex itself (YELL_WITH_QUESITON_EXPRESSION) does not guarantee an uppercase character
		// (e.g., "123?" would match it but not HAS_YELL_POSSIBILITY), so the combined check is necessary
		// to replicate the original skeleton's behavior for this specific rule.
		if (YELL_WITH_QUESITON_EXPRESSION.test(message)) {
			return "Calm down, I know what I'm doing!";
		}

		// 2b. Yelling Check
		// Similar to above, this requires both an uppercase letter AND matching the "yelling" regex.
		// The regex (YELL_EXPRESSION) also doesn't guarantee an uppercase character (e.g., "123" would match it),
		// so the combined check is necessary to replicate the original skeleton's behavior.
		if (YELL_EXPRESSION.test(message)) {
			return "Whoa, chill out!";
		}
	}

	// 3. Simple Question Check
	// Using String.prototype.endsWith() is more direct and potentially more efficient
	// than checking charAt(length - 1).
	// This check is performed on the `trimmedMessage` as per the skeleton's behavior.
	if (trimmedMessage.endsWith("?")) {
		return "Sure.";
	}

	// 4. Default Response
	return "Whatever.";
};