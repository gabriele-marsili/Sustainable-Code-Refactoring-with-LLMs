#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

static char token_buffer[MAX_WORD_LENGTH];

char *nstrtok(char *text, int (*test)(char, char*)) {
    static char *text_p;
    char *buff_p = token_buffer;

    if(text != NULL) text_p = text;

    while(*text_p && !test(*text_p, text_p)) text_p++;
    
    if(!*text_p) return NULL;
    
    while(*text_p && test(*text_p, text_p) && (buff_p - token_buffer) < MAX_WORD_LENGTH - 1) {
        *buff_p++ = tolower(*text_p);
        text_p++;
    }
    *buff_p = '\0';
    
    return buff_p == token_buffer ? NULL : token_buffer;
}

int ok_char(char c, char *char_p) {
    if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) 
        return 1;
    if(c == '\'' && char_p) {
        char prev = *(char_p - 1);
        char next = *(char_p + 1);
        return ((prev >= 'a' && prev <= 'z') || (prev >= 'A' && prev <= 'Z') || (prev >= '0' && prev <= '9')) &&
               ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z') || (next >= '0' && next <= '9'));
    }
    return 0;
}

void lower(char *word) { 
    // Function kept for interface compatibility but not used
}

int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    
    for(char *word = nstrtok(input_text, ok_char);
            word != NULL && nWords < MAX_WORDS;
            word = nstrtok(NULL, ok_char)) {
        
        int i;
        for(i = 0; i < nWords; i++) {
            if(strcmp(words[i].text, word) == 0) {
                words[i].count++;
                break;
            }
        }
        
        if(i == nWords) {
            strcpy(words[nWords].text, word);
            words[nWords].count = 1;
            nWords++;
        }
    }
    return nWords;
}