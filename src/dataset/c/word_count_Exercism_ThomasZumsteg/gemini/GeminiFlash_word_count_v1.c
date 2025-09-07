#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdio.h>

// Optimized nstrtok
char *nstrtok(char *text, int (*test)(char)) {
    static char *text_p;
    char *start;

    if (text != NULL) {
        text_p = text;
    }

    // Skip non-word characters
    while (*text_p && !test(*text_p)) {
        text_p++;
    }

    if (!*text_p) {
        return NULL;
    }

    start = text_p;

    // Find the end of the word
    while (*text_p && test(*text_p)) {
        text_p++;
    }

    // Null-terminate the word in place
    if (*text_p) {
        *text_p = '\0';
        text_p++;
    }

    return start;
}

// Optimized ok_char
int ok_char(char c) {
    return (isalnum(c) || c == '\'');
}

// Optimized lower
void lower(char *word) {
    for (char *p = word; *p; p++) {
        *p = tolower((unsigned char)*p);
    }
}

// Optimized word_count
int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    char *word;
    int i;

    // Early exit if input is NULL or empty
    if (input_text == NULL || *input_text == '\0') {
        return 0;
    }

    for (word = nstrtok(input_text, ok_char); word != NULL; word = nstrtok(NULL, ok_char)) {
        lower(word);

        // Linear search for existing word
        for (i = 0; i < nWords; i++) {
            if (strcmp(words[i].text, word) == 0) {
                words[i].count++;
                break;
            }
        }

        // If word not found, add it to the list
        if (i == nWords) {
            if (nWords < MAX_WORDS) {
                strncpy(words[nWords].text, word, MAX_WORD_LENGTH - 1);
                words[nWords].text[MAX_WORD_LENGTH - 1] = '\0'; // Ensure null termination
                words[nWords].count = 1;
                nWords++;
            } else {
                // Handle the case where MAX_WORDS is exceeded (optional)
                fprintf(stderr, "Warning: MAX_WORDS exceeded, skipping word '%s'\n", word);
                // You might want to return an error code or handle this differently
                break; // Stop processing further words
            }
        }
    }

    return nWords;
}