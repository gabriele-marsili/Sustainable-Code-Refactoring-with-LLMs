// exercism word_count
// t.brumley, june 2022

#include "word_count.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

// utility function prototypes
static void normalize_word(char *word);
static int find_word_index(const char *token, const word_count_word_t *words, int count);

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
        return 0;

    int word_count = 0;
    const char *ptr = sentence;
    char current_word[MAX_WORD_LENGTH + 1];
    int word_len = 0;
    
    while (*ptr) {
        if (isalnum(*ptr) || *ptr == '\'') {
            if (word_len < MAX_WORD_LENGTH) {
                current_word[word_len++] = tolower(*ptr);
            }
        } else {
            if (word_len > 0) {
                current_word[word_len] = '\0';
                normalize_word(current_word);
                
                if (strlen(current_word) > 0) {
                    int index = find_word_index(current_word, words, word_count);
                    if (index >= 0) {
                        words[index].count++;
                    } else if (word_count < MAX_WORDS) {
                        strcpy(words[word_count].text, current_word);
                        words[word_count].count = 1;
                        word_count++;
                    }
                }
                word_len = 0;
            }
        }
        ptr++;
    }
    
    // Handle last word if sentence doesn't end with delimiter
    if (word_len > 0) {
        current_word[word_len] = '\0';
        normalize_word(current_word);
        
        if (strlen(current_word) > 0) {
            int index = find_word_index(current_word, words, word_count);
            if (index >= 0) {
                words[index].count++;
            } else if (word_count < MAX_WORDS) {
                strcpy(words[word_count].text, current_word);
                words[word_count].count = 1;
                word_count++;
            }
        }
    }
    
    return word_count;
}

// utility function implementations
static void normalize_word(char *word) {
    if (word == NULL || *word == '\0')
        return;
        
    int len = strlen(word);
    
    // Remove leading and trailing apostrophes
    while (len > 0 && word[len - 1] == '\'') {
        word[--len] = '\0';
    }
    
    int start = 0;
    while (word[start] == '\'') {
        start++;
    }
    
    if (start > 0) {
        memmove(word, word + start, len - start + 1);
    }
}

static int find_word_index(const char *token, const word_count_word_t *words, int count) {
    for (int i = 0; i < count; i++) {
        if (strcmp(words[i].text, token) == 0) {
            return i;
        }
    }
    return -1;
}