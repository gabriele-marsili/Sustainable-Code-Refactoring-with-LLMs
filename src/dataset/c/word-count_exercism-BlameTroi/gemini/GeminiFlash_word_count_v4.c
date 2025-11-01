#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

static char *stringdup(const char *s);
static size_t smin(size_t a, size_t b);
static int findWord(const char *token, const word_count_word_t *table, size_t slots);

int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL) {
        return 0;
    }

    size_t slots = 1;
    size_t unique_word_count = 0;
    word_count_word_t *word_table = calloc(slots, sizeof(word_count_word_t));
    if (word_table == NULL) {
        return -1; // Memory allocation failure
    }

    char *sentence_copy = stringdup(sentence);
    if (sentence_copy == NULL) {
        free(word_table);
        return -1; // Memory allocation failure
    }

    char *token = strtok(sentence_copy, " \t\n");
    while (token != NULL) {
        // Normalize the token to lowercase
        for (int i = 0; token[i]; i++) {
            token[i] = tolower(token[i]);
        }

        int index = findWord(token, word_table, unique_word_count);
        if (index != -1) {
            word_table[index].count++;
        } else {
            if (unique_word_count == slots) {
                size_t new_slots = slots * 2;
                word_count_word_t *new_table = realloc(word_table, new_slots * sizeof(word_count_word_t));
                if (new_table == NULL) {
                    free(sentence_copy);
                    for (size_t i = 0; i < unique_word_count; ++i) {
                        free(word_table[i].text);
                    }
                    free(word_table);
                    return -1; // Memory allocation failure
                }
                word_table = new_table;
                memset(word_table + slots, 0, slots * sizeof(word_count_word_t));
                slots = new_slots;
            }

            word_table[unique_word_count].text = stringdup(token);
            if (word_table[unique_word_count].text == NULL) {
                free(sentence_copy);
                for (size_t i = 0; i < unique_word_count; ++i) {
                    free(word_table[i].text);
                }
                free(word_table);
                return -1; // Memory allocation failure
            }
            word_table[unique_word_count].count = 1;
            unique_word_count++;
        }

        token = strtok(NULL, " \t\n");
    }

    free(sentence_copy);

    // Copy the results to the output array
    for (size_t i = 0; i < unique_word_count; ++i) {
        strncpy(words[i].text, word_table[i].text, MAX_WORD_LENGTH);
        words[i].text[MAX_WORD_LENGTH - 1] = '\0';
        words[i].count = word_table[i].count;
        free(word_table[i].text);
    }
    free(word_table);

    return (int)unique_word_count;
}

static char *stringdup(const char *s) {
    if (s == NULL) return NULL;
    size_t len = strlen(s) + 1;
    char *new_string = malloc(len);
    if (new_string == NULL) return NULL;
    memcpy(new_string, s, len);
    return new_string;
}

static size_t smin(size_t a, size_t b) {
    return (a <= b) ? a : b;
}

static int findWord(const char *token, const word_count_word_t *table, size_t slots) {
    if (token == NULL || table == NULL) {
        return -1;
    }

    for (size_t i = 0; i < slots; ++i) {
        if (table[i].text != NULL && strcmp(table[i].text, token) == 0) {
            return (int)i;
        }
    }
    return -1;
}