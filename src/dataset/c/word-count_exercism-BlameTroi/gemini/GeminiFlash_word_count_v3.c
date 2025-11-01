#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *stringdup(const char *s);
static size_t smin(size_t a, size_t b);
static bool inTable(const char *token, const word_count_word_t *table, size_t slots);
static void normalize_word(char *word);

int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL) {
        return 0;
    }

    size_t slots = 0;
    size_t unique_word_count = 0;
    words = NULL;

    char *sentence_copy = stringdup(sentence);
    if (sentence_copy == NULL) {
        return -1; 
    }

    char *token = strtok(sentence_copy, " \t\n");
    while (token != NULL) {
        normalize_word(token);
        if (strlen(token) == 0) {
            token = strtok(NULL, " \t\n");
            continue;
        }

        bool found = false;
        for (size_t i = 0; i < unique_word_count; ++i) {
            if (strcmp(words[i].text, token) == 0) {
                words[i].count++;
                found = true;
                break;
            }
        }

        if (!found) {
            if (unique_word_count == slots) {
                size_t new_slots = (slots == 0) ? 1 : slots * 2;
                word_count_word_t *new_words = realloc(words, new_slots * sizeof(word_count_word_t));
                if (new_words == NULL) {
                    free(sentence_copy);
                    free(words);
                    return -1;
                }
                words = new_words;
                slots = new_slots;
            }

            strncpy(words[unique_word_count].text, token, MAX_WORD_LENGTH);
            words[unique_word_count].text[MAX_WORD_LENGTH - 1] = '\0';
            words[unique_word_count].count = 1;
            unique_word_count++;
        }

        token = strtok(NULL, " \t\n");
    }

    free(sentence_copy);
    return (int)unique_word_count;
}

static char *stringdup(const char *s) {
    if (s == NULL) {
        return NULL;
    }
    size_t len = strlen(s) + 1;
    char *t = malloc(len);
    if (t == NULL) {
        return NULL;
    }
    memcpy(t, s, len);
    return t;
}

static size_t smin(size_t a, size_t b) {
    return (a <= b) ? a : b;
}

static bool inTable(const char *token, const word_count_word_t *table, size_t slots) {
    if (token == NULL || table == NULL) {
        return false;
    }

    for (size_t i = 0; i < slots; ++i) {
        if (strcmp(table[i].text, token) == 0) {
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