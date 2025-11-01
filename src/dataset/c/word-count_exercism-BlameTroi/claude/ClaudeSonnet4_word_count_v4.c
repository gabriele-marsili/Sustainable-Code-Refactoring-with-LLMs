// exercism word_count
// t.brumley, june 2022

#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *stringdup(const char *s);
static size_t smin(size_t a, size_t b);
static int findInTable(const char *token, const word_count_word_t *table, size_t count);
static void normalizeToken(char *token);
static bool isValidChar(char c);

int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL || words == NULL)
        return 0;

    size_t capacity = 8;
    size_t count = 0;
    
    char *acopy = stringdup(sentence);
    if (!acopy)
        return -1;
    
    char *current = acopy;
    char token[MAX_WORD_LENGTH + 1];
    size_t token_len = 0;
    
    while (*current) {
        if (isValidChar(*current)) {
            if (token_len < MAX_WORD_LENGTH) {
                token[token_len++] = tolower(*current);
            }
        } else {
            if (token_len > 0) {
                token[token_len] = '\0';
                normalizeToken(token);
                
                if (token[0] != '\0') {
                    int existing_index = findInTable(token, words, count);
                    if (existing_index >= 0) {
                        words[existing_index].count++;
                    } else {
                        if (count >= capacity) {
                            capacity *= 2;
                            word_count_word_t *new_words = realloc(words, capacity * sizeof(word_count_word_t));
                            if (!new_words) {
                                free(acopy);
                                return -1;
                            }
                            words = new_words;
                        }
                        
                        strncpy(words[count].text, token, MAX_WORD_LENGTH);
                        words[count].text[MAX_WORD_LENGTH] = '\0';
                        words[count].count = 1;
                        count++;
                    }
                }
                token_len = 0;
            }
        }
        current++;
    }
    
    if (token_len > 0) {
        token[token_len] = '\0';
        normalizeToken(token);
        
        if (token[0] != '\0') {
            int existing_index = findInTable(token, words, count);
            if (existing_index >= 0) {
                words[existing_index].count++;
            } else {
                if (count >= capacity) {
                    capacity *= 2;
                    word_count_word_t *new_words = realloc(words, capacity * sizeof(word_count_word_t));
                    if (!new_words) {
                        free(acopy);
                        return -1;
                    }
                    words = new_words;
                }
                
                strncpy(words[count].text, token, MAX_WORD_LENGTH);
                words[count].text[MAX_WORD_LENGTH] = '\0';
                words[count].count = 1;
                count++;
            }
        }
    }

    free(acopy);
    return count;
}

static char *stringdup(const char *s) {
    size_t len = strlen(s);
    char *t = malloc(len + 1);
    if (t) {
        memcpy(t, s, len + 1);
    }
    return t;
}

static size_t smin(size_t a, size_t b) {
    return (a <= b) ? a : b;
}

static int findInTable(const char *token, const word_count_word_t *table, size_t count) {
    for (size_t i = 0; i < count; i++) {
        if (strcmp(table[i].text, token) == 0) {
            return i;
        }
    }
    return -1;
}

static bool isValidChar(char c) {
    return isalnum(c) || c == '\'';
}

static void normalizeToken(char *token) {
    size_t len = strlen(token);
    if (len == 0) return;
    
    while (len > 0 && token[len - 1] == '\'') {
        token[--len] = '\0';
    }
    
    size_t start = 0;
    while (token[start] == '\'') {
        start++;
    }
    
    if (start > 0) {
        memmove(token, token + start, len - start + 1);
    }
}