#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <regex.h>

#include "word_count.h"

int _is_already_found(const char *word, word_count_word_t * words);
void _safe_strncpy(char *dest, const char *src, size_t n);
void _str_tolower(char *str, int len);

static regex_t compiled_regex;
static int regex_initialized = 0;

int word_count(const char *input_text, word_count_word_t * words) {
	int already_found_index;
	int words_found = 0;
	int err_no;

	// Extended regex.
	char *pattern = "[[:alnum:]]+('?[[:alnum:]]+)?";

	char buffer[MAX_WORD_LENGTH+1];
	regmatch_t result[2];

	//////////////////////////////////////////////////////////////////
	// Clear the words array
	//////////////////////////////////////////////////////////////////
	memset(words, 0, MAX_WORDS * sizeof(*words));

	/* Compile the regex once and reuse */
	if (!regex_initialized) {
		if((err_no = regcomp(&compiled_regex, pattern, REG_EXTENDED | REG_ICASE)) != 0) {
			perror("Regex failed to compile.\n");
			exit(EXIT_FAILURE);
		}
		regex_initialized = 1;
	}

	const char *current_pos = input_text;

	while(regexec(&compiled_regex, current_pos, 2, result, 0) == 0) {
		int word_length = result[0].rm_eo - result[0].rm_so;
		
		if (word_length > MAX_WORD_LENGTH) {
			return EXCESSIVE_LENGTH_WORD;
		}

		if (words_found >= MAX_WORDS) {
			return EXCESSIVE_NUMBER_OF_WORDS;
		}

		// Copy and convert to lowercase in one pass
		int i;
		for (i = 0; i < word_length; i++) {
			buffer[i] = tolower(current_pos[result[0].rm_so + i]);
		}
		buffer[word_length] = '\0';

		if ((already_found_index = _is_already_found(buffer, words)) != -1) {
			words[already_found_index].count += 1;
		} else {
			memcpy(words[words_found].text, buffer, word_length + 1);
			words[words_found].count = 1;
			words_found++;
		}

		current_pos += result[0].rm_eo; /* Update the offset */
	}

	return words_found;
}

// Optimized search with early termination
int _is_already_found(const char *word, word_count_word_t * words) {
	int i;
	int word_len = strlen(word);

	for (i = 0; i < MAX_WORDS; i++) {
		// Short-cut the search if possible.
		if (words[i].text[0] == '\0') {
			return -1;
		}

		// Quick length check first
		if (strlen(words[i].text) == word_len && 
		    memcmp(word, words[i].text, word_len) == 0) {
			return i;
		}
	}

	return -1;	
}

// Optimized safe string copy
void _safe_strncpy(char *dest, const char *src, size_t n) {
	memcpy(dest, src, n);
	dest[n] = '\0';
}

// Optimized string tolower
void _str_tolower(char *str, int len) {
	int i;
	for (i = 0; i < len; i++) {
		if (str[i] >= 'A' && str[i] <= 'Z') {
			str[i] += 32;
		}
	}
}