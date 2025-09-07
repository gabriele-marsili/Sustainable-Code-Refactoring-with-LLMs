#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "word_count.h"

int _is_already_found(const char *word, word_count_word_t * words);
void _safe_strncpy(char *dest, const char *src, size_t n);
void _str_tolower(char *str, int len);

int word_count(const char *input_text, word_count_word_t * words) {
    int already_found_index;
    int words_found = 0;

    // Initialize words array to empty strings and zero counts
    for (int i = 0; i < MAX_WORDS; i++) {
        words[i].text[0] = '\0';
        words[i].count = 0;
    }

    char buffer[MAX_WORD_LENGTH + 1];
    const char *delimiter = " ,.!?:;-\"'()\n\t"; // More comprehensive delimiter
    char *token;
    char *mutable_input;

    // Create a mutable copy of the input text
    mutable_input = strdup(input_text);
    if (mutable_input == NULL) {
        perror("strdup failed");
        return -1; // Indicate memory allocation failure
    }

    token = strtok(mutable_input, delimiter);
    while (token != NULL) {
        size_t token_len = strlen(token);

        if (token_len > MAX_WORD_LENGTH) {
            free(mutable_input);
            return EXCESSIVE_LENGTH_WORD;
        }

        if (words_found >= MAX_WORDS) {
            free(mutable_input);
            return EXCESSIVE_NUMBER_OF_WORDS;
        }

        _str_tolower(token, token_len);

        already_found_index = _is_already_found(token, words);
        if (already_found_index != -1) {
            words[already_found_index].count++;
        } else {
            _safe_strncpy(words[words_found].text, token, token_len);
            words[words_found].count = 1;
            words_found++;
        }

        token = strtok(NULL, delimiter);
    }

    free(mutable_input);
    return words_found;
}


// Horrible linear search of array. Dicts are nice.
int _is_already_found(const char *word, word_count_word_t * words) {
	int i;

	for (i=0; i<MAX_WORDS; i++) {
		// Short-cut the search if possible.
		if (words[i].text[0] == '\0') {
			return -1;
		}

		if (strncasecmp(word, words[i].text, MAX_WORD_LENGTH) == 0) {
			return i;
		}
	}

	return -1;	
}

// Horrible safe string copy, including null termination.
void _safe_strncpy(char *dest, const char *src, size_t n) {
	strncpy(dest, src, n);

	// Properly null terminate please.
	dest[n] = '\0';
}

// Horrible string tolower.
void _str_tolower(char *str, int len) {
	int i;

	for (i=0; i<len; i++) {
		str[i] = tolower(str[i]);
	}
}