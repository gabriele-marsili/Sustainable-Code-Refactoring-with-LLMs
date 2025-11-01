#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

// utility function prototypes
static char *stringdup(const char *s);
static size_t smin(size_t a, size_t b);
static int findInTable(const char *token, word_count_word_t *table, size_t slots);

// count_words - routine to classify the unique words and their frequency in a
// sentence inputs:
//    sentence =  a null-terminated string containing that is analyzed
//
// outputs:
//    words = allocated structure to record the words found and their frequency
//    uniqueWords - number of words in the words structure
//           returns a negative number if an error.
//           words will contain the results up to that point.
int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL || words == NULL)
        return -1;

    size_t slots = MAX_WORDS;
    size_t next = 0;

    // strtok modifies the string, so we'll need to make a copy
    char *acopy = stringdup(sentence);
    if (!acopy)
        return -1;

    char *token = NULL;
    char *delims = " \t\n";
    token = strtok(acopy, delims);

    while (token != NULL) {
        // Convert token to lowercase for case-insensitivity
        for (char *p = token; *p; ++p)
            *p = tolower(*p);

        int index = findInTable(token, words, next);
        if (index == -1) {
            if (next >= slots) {
                free(acopy);
                return -1; // Exceeded maximum word count
            }
            strncpy(words[next].text, token, MAX_WORD_LENGTH - 1);
            words[next].text[MAX_WORD_LENGTH - 1] = '\0';
            words[next].count = 1;
            next++;
        } else {
            words[index].count++;
        }

        token = strtok(NULL, delims);
    }

    free(acopy);
    return next;
}

// utility function implementations

static char *stringdup(const char *s) {
    size_t len = strlen(s) + 1;
    char *t = malloc(len);
    if (t)
        memcpy(t, s, len);
    return t;
}

static size_t smin(size_t a, size_t b) {
    return (a < b) ? a : b;
}

static int findInTable(const char *token, word_count_word_t *table, size_t slots) {
    for (size_t i = 0; i < slots; i++) {
        if (strcmp(table[i].text, token) == 0)
            return i;
    }
    return -1;
}