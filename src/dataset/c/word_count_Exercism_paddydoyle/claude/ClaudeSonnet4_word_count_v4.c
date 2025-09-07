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

int word_count(const char *input_text, word_count_word_t * words) {
	int already_found_index;
	int words_found = 0;
	int err_no;

	static regex_t regex;
	static int regex_compiled = 0;
	char *pattern = "[[:alnum:]]+('?[[:alnum:]]+)?";

	char buffer[MAX_WORD_LENGTH+1];
	regmatch_t result[2];

	memset(words, 0, MAX_WORDS * sizeof(*words));

	if (!regex_compiled) {
		if((err_no = regcomp(&regex, pattern, REG_EXTENDED | REG_ICASE)) != 0) {
			perror("Regex failed to compile.\n");
			exit(EXIT_FAILURE);
		}
		regex_compiled = 1;
	}

	const char *current_pos = input_text;
	
	while(regexec(&regex, current_pos, 2, result, 0) == 0) {
		int word_length = result[0].rm_eo - result[0].rm_so;
		
		if (word_length > MAX_WORD_LENGTH) {
			return EXCESSIVE_LENGTH_WORD;
		}

		if (words_found >= MAX_WORDS) {
			return EXCESSIVE_NUMBER_OF_WORDS;
		}

		_safe_strncpy(buffer, current_pos + result[0].rm_so, word_length);
		_str_tolower(buffer, word_length);

		if ((already_found_index = _is_already_found(buffer, words, words_found)) != -1) {
			words[already_found_index].count++;
		} else {
			_safe_strncpy(words[words_found].text, buffer, word_length);
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