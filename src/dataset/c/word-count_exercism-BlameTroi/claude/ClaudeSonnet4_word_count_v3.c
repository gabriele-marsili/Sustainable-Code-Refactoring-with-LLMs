// exercism word_count
// t.brumley, june 2022

#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *stringdup(const char *s);
static void normalize_word(char *word);
static int find_word_index(const char *word, const word_count_word_t *words, int count);

int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL || words == NULL) {
        return 0;
    }

    int word_count = 0;
    const char *ptr = sentence;
    char current_word[MAX_WORD_LENGTH + 1];
    int word_len = 0;

    while (*ptr != '\0') {
        if (isalnum(*ptr) || *ptr == '\'') {
            if (word_len < MAX_WORD_LENGTH) {
                current_word[word_len++] = tolower(*ptr);
            }
        } else {
            if (word_len > 0) {
                current_word[word_len] = '\0';
                normalize_word(current_word);
                
                if (current_word[0] != '\0') {
                    int existing_index = find_word_index(current_word, words, word_count);
                    
                    if (existing_index >= 0) {
                        words[existing_index].count++;
                    } else if (word_count < MAX_WORDS) {
                        strncpy(words[word_count].text, current_word, MAX_WORD_LENGTH);
                        words[word_count].text[MAX_WORD_LENGTH] = '\0';
                        words[word_count].count = 1;
                        word_count++;
                    }
                }
                word_len = 0;
            }
        }
        ptr++;
    }

    if (word_len > 0) {
        current_word[word_len] = '\0';
        normalize_word(current_word);
        
        if (current_word[0] != '\0') {
            int existing_index = find_word_index(current_word, words, word_count);
            
            if (existing_index >= 0) {
                words[existing_index].count++;
            } else if (word_count < MAX_WORDS) {
                strncpy(words[word_count].text, current_word, MAX_WORD_LENGTH);
                words[word_count].text[MAX_WORD_LENGTH] = '\0';
                words[word_count].count = 1;
                word_count++;
            }
        }
    }

    return word_count;
}

static char *stringdup(const char *s) {
    size_t len = strlen(s) + 1;
    char *t = malloc(len);
    if (t != NULL) {
        memcpy(t, s, len);
    }
    return t;
}

static void normalize_word(char *word) {
    int len = strlen(word);
    if (len > 0 && word[0] == '\'' && word[len-1] == '\'') {
        memmove(word, word + 1, len - 2);
        word[len - 2] = '\0';
    }
}

static int find_word_index(const char *word, const word_count_word_t *words, int count) {
    for (int i = 0; i < count; i++) {
        if (strcmp(words[i].text, word) == 0) {
            return i;
        }
    }
    return -1;
}