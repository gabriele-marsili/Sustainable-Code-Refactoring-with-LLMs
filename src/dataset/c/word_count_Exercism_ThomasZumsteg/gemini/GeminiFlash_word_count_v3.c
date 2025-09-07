#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

static char *text_p;

char *nstrtok(char *text, int (*test)(char, char*)) {
    char *buff = NULL;
    char *buff_p = NULL;
    size_t buff_len = 0;

    if (text != NULL) {
        text_p = text;
    }

    while (*text_p && !test(*text_p, text_p)) {
        text_p++;
    }

    const char *start = text_p;
    while (*text_p && test(*text_p, text_p)) {
        text_p++;
    }

    size_t word_len = text_p - start;

    if (word_len == 0) {
        return NULL;
    }

    buff = malloc(sizeof(char) * (word_len + 1));
    if (buff == NULL) {
        return NULL;
    }

    memcpy(buff, start, word_len);
    buff[word_len] = '\0';

    return buff;
}


int ok_char(char c, char *char_p) {
    if (isalnum((unsigned char)c)) return 1;
    else if (c == '\'' && char_p != NULL && isalnum((unsigned char)*(char_p+1)) && char_p > (char*)0 && isalnum((unsigned char)*(char_p - 1)))
        return 1;
    return 0;
}

void lower(char *word) {
    for (char *p = word; *p; p++) {
        *p = tolower((unsigned char)*p);
    }
}

int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    char *word;

    while ((word = nstrtok(input_text, ok_char)) != NULL) {
        input_text = NULL; 
        lower(word);

        bool found = false;
        for (int i = 0; i < nWords; i++) {
            if (strcmp(words[i].text, word) == 0) {
                words[i].count++;
                found = true;
                break;
            }
        }

        if (!found) {
            if (nWords < MAX_WORDS) {
                strncpy(words[nWords].text, word, MAX_WORD_LENGTH - 1);
                words[nWords].text[MAX_WORD_LENGTH - 1] = '\0';
                words[nWords].count = 1;
                nWords++;
            } else {
                free(word);
                return -1;
            }
        }
        free(word);
    }

    return nWords;
}