#include <stdbool.h>
#include <stddef.h>

#define ALL ('z' - 'a' + 1)

bool is_pangram(const char *sentence)
{
	if (sentence == NULL) {
		return false;
	}

	int lcount = 0;
	bool letters[ALL] = {false};

	char current_char;
	int index;

	while (*sentence) {
		current_char = *sentence;

		if (current_char >= 'a' && current_char <= 'z') {
			index = current_char - 'a';
		} else if (current_char >= 'A' && current_char <= 'Z') {
			index = current_char - 'A';
		} else {
			sentence++;
			continue;
		}

		if (!letters[index]) {
			letters[index] = true;
			if (++lcount == ALL) {
				return true;
			}
		}
		sentence++;
	}

	return false;
}