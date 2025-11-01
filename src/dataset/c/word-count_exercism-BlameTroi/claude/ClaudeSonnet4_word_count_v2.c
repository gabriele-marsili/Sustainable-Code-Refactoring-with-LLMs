// exercism word_count
// t.brumley, june 2022

#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

// utility function prototypes
static size_t smin(size_t a, size_t b);
static int findInTable(const char *token, const word_count_word_t *table, size_t count);
static void normalize_word(char *word);

int count_words(const char *sentence, word_count_word_t *words) {
    if (sentence == NULL || words == NULL)
        return 0;

    int unique_count = 0;
    const char *ptr = sentence;
    char current_word[MAX_WORD_LENGTH + 1];
    
    while (*ptr) {
        // Skip non-alphanumeric characters and apostrophes
        while (*ptr && !isalnum(*ptr) && *ptr != '\'')
            ptr++;
        
        if (!*ptr)
            break;
            
        // Extract word
        size_t word_len = 0;
        const char *word_start = ptr;
        
        while (*ptr && (isalnum(*ptr) || *ptr == '\'') && word_len < MAX_WORD_LENGTH) {
            current_word[word_len++] = *ptr++;
        }
        
        // Skip remaining characters if word is too long
        while (*ptr && (isalnum(*ptr) || *ptr == '\''))
            ptr++;
            
        if (word_len == 0)
            continue;
            
        current_word[word_len] = '\0';
        normalize_word(current_word);
        
        // Check if word already exists
        int existing_index = findInTable(current_word, words, unique_count);
        
        if (existing_index >= 0) {
            words[existing_index].count++;
        } else {
            if (unique_count >= MAX_WORDS)
                break;
                
            // Add new word
            strncpy(words[unique_count].text, current_word, MAX_WORD_LENGTH);
            words[unique_count].text[MAX_WORD_LENGTH] = '\0';
            words[unique_count].count = 1;
            unique_count++;
        }
    }
    
    return unique_count;
}

// utility function implementations
static size_t smin(size_t a, size_t b) {
    return (a <= b) ? a : b;
}

static int findInTable(const char *token, const word_count_word_t *table, size_t count) {
    for (size_t i = 0; i < count; i++) {
        if (strcmp(table[i].text, token) == 0)
            return (int)i;
    }
    return -1;
}

static void normalize_word(char *word) {
    // Convert to lowercase
    for (char *p = word; *p; p++) {
        *p = tolower(*p);
    }
    
    // Remove leading and trailing apostrophes
    size_t len = strlen(word);
    if (len > 0 && word[0] == '\'') {
        memmove(word, word + 1, len);
        len--;
    }
    if (len > 0 && word[len - 1] == '\'') {
        word[len - 1] = '\0';
    }
}