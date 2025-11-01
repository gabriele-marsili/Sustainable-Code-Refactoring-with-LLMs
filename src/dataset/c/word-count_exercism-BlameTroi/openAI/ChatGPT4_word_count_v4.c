#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *stringdup(const char *s);
static size_t smin(size_t a, size_t b);
static bool inTable(const char *token, const word_count_word_t *table, size_t slots);

int count_words(const char *sentence, word_count_word_t *words) {
    if (!sentence || !words)
        return -1;

    size_t slots = MAX_WORDS;
    size_t next = 0;

    char *acopy = stringdup(sentence);
    if (!acopy)
        return -1;

    char *token = strtok(acopy, " \t\n");
    while (token) {
        for (char *p = token; *p; ++p)
            *p = tolower(*p);

        if (!inTable(token, words, next)) {
            if (next >= slots) {
                free(acopy);
                return -1;
            }
            strncpy(words[next].text, token, MAX_WORD_LENGTH - 1);
            words[next].text[MAX_WORD_LENGTH - 1] = '\0';
            words[next].count = 1;
            next++;
        } else {
            for (size_t i = 0; i < next; i++) {
                if (strcmp(words[i].text, token) == 0) {
                    words[i].count++;
                    break;
                }
            }
        }
        token = strtok(NULL, " \t\n");
    }

    free(acopy);
    return next;
}

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

static bool inTable(const char *token, const word_count_word_t *table, size_t slots) {
    for (size_t i = 0; i < slots; i++) {
        if (strcmp(table[i].text, token) == 0)
            return true;
    }
    return false;
}