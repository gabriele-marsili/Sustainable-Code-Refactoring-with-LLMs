#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

char *nstrtok(char *text, int (*test)(char, char*)) {
    static char *text_p;
    static char buff[MAX_WORD_LENGTH];
    char *buff_p;

    if(text != NULL) text_p = text;

    while(*text_p && !test(*text_p, text_p)) text_p++;
    for(buff_p = buff; *text_p && test(*text_p, text_p) && (buff_p - buff) < MAX_WORD_LENGTH - 1; text_p++, buff_p++)
        *buff_p = tolower(*text_p);
    *buff_p = '\0';
    return buff_p == buff ? NULL : buff;
}

int ok_char(char c, char *char_p) {
    if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) return 1;
    if(c == '\'' && char_p) {
        char next = *(char_p + 1);
        char prev = *(char_p - 1);
        return ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z') || (next >= '0' && next <= '9')) &&
               ((prev >= 'a' && prev <= 'z') || (prev >= 'A' && prev <= 'Z') || (prev >= '0' && prev <= '9'));
    }
    return 0;
}

void lower(char *word) { 
    for(char *p = word; *p; p++) 
        *p = (*p >= 'A' && *p <= 'Z') ? *p + 32 : *p; 
}

int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    char *word;
    
    for(word = nstrtok(input_text, ok_char); word != NULL && nWords < MAX_WORDS; word = nstrtok(NULL, ok_char)) {
        int found = 0;
        for(int i = 0; i < nWords; i++) {
            if(strcmp(words[i].text, word) == 0) {
                words[i].count++;
                found = 1;
                break;
            }
        }
        if(!found) {
            strcpy(words[nWords].text, word);
            words[nWords].count = 1;
            nWords++;
        }
    }
    return nWords;
}