#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

static char *stringdup(const char *s);
static size_t smin(size_t a, size_t b);
static bool inTable(const char *token, const word_count_word_t *table, size_t slots);
static void normalize_word(char *word);

int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL) {
        return 0;
    }

    size_t slots = 10; 
    size_t next = 0;
    words = calloc(slots, sizeof(word_count_word_t));
    if (words == NULL) {
        return -1; 
    }

    char *acopy = stringdup(sentence);
    if (acopy == NULL) {
        free(words);
        return -1;
    }

    char *token;
    char *delims = " \t\n";
    char *saveptr;

    token = strtok_r(acopy, delims, &saveptr);
    while (token != NULL) {
        normalize_word(token);
        if (strlen(token) > 0) {
            bool found = inTable(token, words, next);
            if (found) {
                for (size_t i = 0; i < next; ++i) {
                    if (strcmp(words[i].text, token) == 0) {
                        words[i].count++;
                        break;
                    }
                }
            } else {
                if (next == slots) {
                    slots *= 2;
                    word_count_word_t *newWords = realloc(words, slots * sizeof(word_count_word_t));
                    if (newWords == NULL) {
                        free(acopy);
                        for (size_t i = 0; i < next; ++i) {
                            free(words[i].text);
                        }
                        free(words);
                        return -1;
                    }
                    words = newWords;
                }

                words[next].text = stringdup(token);
                if (words[next].text == NULL) {
                    free(acopy);
                    for (size_t i = 0; i < next; ++i) {
                        free(words[i].text);
                    }
                    free(words);
                    return -1;
                }
                words[next].count = 1;
                next++;
            }
        }
        token = strtok_r(NULL, delims, &saveptr);
    }

    free(acopy);
    return (int)next;
}

static char *stringdup(const char *s) {
    if (s == NULL) return NULL;
    size_t len = strlen(s);
    char *t = malloc(len + 1);
    if (t == NULL) return NULL;
    memcpy(t, s, len + 1);
    return t;
}

static size_t smin(size_t a, size_t b) {
    return (a <= b) ? a : b;
}

static bool inTable(const char *token, const word_count_word_t *table, size_t slots) {
    for (size_t i = 0; i < slots; ++i) {
        if (table[i].text != NULL && strcmp(table[i].text, token) == 0) {
            return true;
        }
    }
    return false;
}

static void normalize_word(char *word) {
    if (word == NULL) return;
    for (int i = 0; word[i]; i++) {
        word[i] = tolower(word[i]);
    }
    
    size_t len = strlen(word);
    if (len > 2 && word[0] == '\'' && word[len - 1] == '\'') {
        memmove(word, word + 1, len - 2);
        word[len - 2] = '\0';
    }
}