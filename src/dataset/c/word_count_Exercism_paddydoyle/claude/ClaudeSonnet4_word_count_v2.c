#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <regex.h>

#include "word_count.h"

int _is_already_found(const char *word, word_count_word_t * words, int words_count);
void _safe_strncpy(char *dest, const char *src, size_t n);
void _str_tolower(char *str, int len);

static regex_t compiled_regex;
static int regex_initialized = 0;

int word_count(const char *input_text, word_count_word_t * words) {
	int already_found_index;
	int words_found = 0;
	int err_no;

	char *pattern = "[[:alnum:]]+('?[[:alnum:]]+)?";
	char buffer[MAX_WORD_LENGTH+1];
	regmatch_t result[2];

	memset(words, 0, MAX_WORDS * sizeof(*words));

	if (!regex_initialized) {
		if((err_no = regcomp(&compiled_regex, pattern, REG_EXTENDED | REG_ICASE)) != 0) {
			perror("Regex failed to compile.\n");
			exit(EXIT_FAILURE);
		}
		regex_initialized = 1;
	}

	const char *current_pos = input_text;
	
	while(regexec(&compiled_regex, current_pos, 2, result, 0) == 0) {
		int word_len = result[0].rm_eo - result[0].rm_so;
		
		if (word_len > MAX_WORD_LENGTH) {
			return EXCESSIVE_LENGTH_WORD;
		}

		if (words_found >= MAX_WORDS) {
			return EXCESSIVE_NUMBER_OF_WORDS;
		}

		_safe_strncpy(buffer, current_pos + result[0].rm_so, word_len);
		_str_tolower(buffer, word_len);

		if ((already_found_index = _is_already_found(buffer, words, words_found)) != -1) {
			words[already_found_index].count += 1;
		} else {
			_safe_strncpy(words[words_found].text, buffer, word_len);
			words[words_found].count = 1;
			words_found++;
		}

		current_pos += result[0].rm_eo;
	}

	return words_found;
}

int _is_already_found(const char *word, word_count_word_t * words, int words_count) {
	for (int i = 0; i < words_count; i++) {
		if (strncasecmp(word, words[i].text, MAX_WORD_LENGTH) == 0) {
			return i;
		}
	}
	return -1;	
}

void _safe_strncpy(char *dest, const char *src, size_t n) {
	strncpy(dest, src, n);
	dest[n] = '\0';
}

void _str_tolower(char *str, int len) {
	for (int i = 0; i < len; i++) {
		str[i] = tolower((unsigned char)str[i]);
	}
}