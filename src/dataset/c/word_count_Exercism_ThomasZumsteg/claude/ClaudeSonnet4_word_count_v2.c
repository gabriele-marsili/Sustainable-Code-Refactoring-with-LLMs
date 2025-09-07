#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

static inline int is_valid_char(char c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
}

static inline int is_apostrophe_valid(char *pos, char *start, char *end) {
    return *pos == '\'' && pos > start && pos < end - 1 && 
           is_valid_char(*(pos-1)) && is_valid_char(*(pos+1));
}

static inline char to_lower_fast(char c) {
    return (c >= 'A' && c <= 'Z') ? c + 32 : c;
}

int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    if (!input_text) return 0;
    
    int nWords = 0;
    char *text = input_text;
    char *end = text + strlen(text);
    
    while (text < end) {
        // Skip non-word characters
        while (text < end && !is_valid_char(*text) && 
               !is_apostrophe_valid(text, input_text, end)) {
            text++;
        }
        
        if (text >= end) break;
        
        // Extract word
        char *word_start = text;
        while (text < end && (is_valid_char(*text) || 
               is_apostrophe_valid(text, input_text, end))) {
            text++;
        }
        
        int word_len = text - word_start;
        if (word_len == 0 || word_len >= MAX_WORD_LENGTH) continue;
        
        // Convert to lowercase in-place during comparison
        int found = 0;
        for (int i = 0; i < nWords; i++) {
            if (strlen(words[i].text) == word_len) {
                int match = 1;
                for (int j = 0; j < word_len; j++) {
                    if (words[i].text[j] != to_lower_fast(word_start[j])) {
                        match = 0;
                        break;
                    }
                }
                if (match) {
                    words[i].count++;
                    found = 1;
                    break;
                }
            }
        }
        
        if (!found && nWords < MAX_WORDS) {
            // Copy and convert to lowercase
            for (int j = 0; j < word_len; j++) {
                words[nWords].text[j] = to_lower_fast(word_start[j]);
            }
            words[nWords].text[word_len] = '\0';
            words[nWords].count = 1;
            nWords++;
        }
    }
    
    return nWords;
}