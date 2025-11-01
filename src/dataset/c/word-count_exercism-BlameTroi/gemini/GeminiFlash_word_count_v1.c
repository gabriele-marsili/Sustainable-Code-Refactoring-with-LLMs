#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static size_t smin(size_t a, size_t b);

int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL) {
        return 0;
    }

    size_t slots = 1;
    size_t next = 0;
    word_count_word_t *word_table = calloc(slots, sizeof(word_count_word_t));
    if (word_table == NULL) {
        return -1; // Indicate memory allocation failure
    }

    char *sentence_copy = strdup(sentence);
    if (sentence_copy == NULL) {
        free(word_table);
        return -1; // Indicate memory allocation failure
    }

    char *token = strtok(sentence_copy, " \t\n");
    int unique_word_count = 0;

    while (token != NULL) {
        bool found = false;
        for (size_t i = 0; i < next; ++i) {
            if (strncmp(word_table[i].text, token, MAX_WORD_LENGTH) == 0) {
                word_table[i].count++;
                found = true;
                break;
            }
        }

        if (!found) {
            if (next == slots) {
                size_t new_slots = slots * 2;
                word_count_word_t *new_word_table = realloc(word_table, new_slots * sizeof(word_count_word_t));
                if (new_word_table == NULL) {
                    free(sentence_copy);
                    for (size_t i = 0; i < next; ++i) {
                        // Free allocated strings in case of realloc failure
                    }
                    free(word_table);
                    return -1; // Indicate memory allocation failure
                }
                word_table = new_word_table;
                memset(word_table + slots, 0, slots * sizeof(word_count_word_t)); // Initialize new memory
                slots = new_slots;
            }

            size_t token_len = strlen(token);
            size_t copy_len = smin(MAX_WORD_LENGTH, token_len);
            strncpy(word_table[next].text, token, copy_len);
            word_table[next].text[copy_len] = '\0'; // Ensure null termination
            word_table[next].count = 1;
            next++;
            unique_word_count++;
        }

        token = strtok(NULL, " \t\n");
    }

    free(sentence_copy);

    // Copy the results to the provided 'words' array (if it's large enough)
    if (words != NULL) {
        memcpy(words, word_table, smin(unique_word_count, MAX_WORDS) * sizeof(word_count_word_t));
    }

    free(word_table); // Free the dynamically allocated table

    return unique_word_count;
}

static size_t smin(size_t a, size_t b) {
    return (a <= b) ? a : b;
}