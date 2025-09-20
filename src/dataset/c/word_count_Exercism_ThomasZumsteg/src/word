#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

char *nstrtok(char *text, int (*test)(char, char*)) {
    static char *text_p;
    if (text != NULL) text_p = text;

    while (*text_p && !test(*text_p, text_p)) text_p++;
    if (!*text_p) return NULL;

    char *start = text_p;
    while (*text_p && test(*text_p, text_p)) text_p++;
    *text_p = '\0';
    text_p++;
    return start;
}

int ok_char(char c, char *char_p) {
    if (isalnum(c)) return 1;
    if (c == '\'' && isalnum(*(char_p + 1)) && isalnum(*(char_p - 1))) return 1;
    return 0;
}

void lower(char *word) {
    for (; *word; word++) *word = tolower(*word);
}

int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    for (char *word = nstrtok(input_text, ok_char); word != NULL; word = nstrtok(NULL, ok_char)) {
        lower(word);
        int i;
        for (i = 0; i < nWords; i++) {
            if (strcmp(words[i].text, word) == 0) {
                words[i].count++;
                break;
            }
        }
        if (i == nWords && nWords < MAX_WORDS) {
            strncpy(words[nWords].text, word, MAX_WORD_LENGTH - 1);
            words[nWords].text[MAX_WORD_LENGTH - 1] = '\0';
            words[nWords].count = 1;
            nWords++;
        }
    }
    return nWords;
}