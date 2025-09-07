#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdio.h>

// Pre-allocate a static buffer to avoid repeated allocation/deallocation in nstrtok
#define MAX_INPUT_LENGTH 1024 // Define a reasonable maximum input length
static char strtok_buffer[MAX_INPUT_LENGTH];
static char *strtok_text_p = NULL;

char *nstrtok(char *text, int (*test)(char, const char*)) {
    if (text != NULL) {
        strncpy(strtok_buffer, text, MAX_INPUT_LENGTH - 1); // Copy input to buffer
        strtok_buffer[MAX_INPUT_LENGTH - 1] = '\0'; // Ensure null termination
        strtok_text_p = strtok_buffer;
    }

    if (strtok_text_p == NULL || *strtok_text_p == '\0') {
        return NULL;
    }

    // Skip non-word characters
    while (*strtok_text_p && !test(*strtok_text_p, strtok_text_p)) {
        strtok_text_p++;
    }

    if (*strtok_text_p == '\0') {
        return NULL;
    }

    char *word_start = strtok_text_p;

    // Find the end of the word
    while (*strtok_text_p && test(*strtok_text_p, strtok_text_p)) {
        strtok_text_p++;
    }

    if (*strtok_text_p != '\0') {
        *strtok_text_p = '\0'; // Null-terminate the word
        strtok_text_p++; // Move to the next character
    }

    return word_start;
}


int ok_char(char c, const char *char_p) {
    if (isalnum(c)) {
        return 1;
    } else if (c == '\'' && char_p != NULL && char_p[1] != '\0' && char_p > strtok_buffer && isalnum(char_p[1]) && isalnum(char_p[-1])) {
        return 1;
    }
    return 0;
}


void lower(char *word) {
    for (char *p = word; *p; p++) {
        *p = tolower((unsigned char)*p); // Use unsigned char for tolower
    }
}


int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    char *word;

    for (word = nstrtok(input_text, ok_char); word != NULL; word = nstrtok(NULL, ok_char)) {
        lower(word);

        int i;
        for (i = 0; i < nWords; i++) {
            if (strcmp(words[i].text, word) == 0) {
                words[i].count++;
                break;
            }
        }

        if (i == nWords) {
            if (nWords < MAX_WORDS) {
                strncpy(words[nWords].text, word, MAX_WORD_LENGTH - 1);
                words[nWords].text[MAX_WORD_LENGTH - 1] = '\0'; // Ensure null termination
                words[nWords].count = 1;
                nWords++;
            } else {
                // Handle the case where MAX_WORDS is exceeded (e.g., return an error)
                return -1; // Indicate an error
            }
        }
    }

    return nWords;
}