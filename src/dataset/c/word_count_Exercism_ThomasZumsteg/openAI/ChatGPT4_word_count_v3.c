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

    size_t len = text_p - start;
    char *buff = malloc(len + 1);
    if (!buff) return NULL;

    memcpy(buff, start, len);
    buff[len] = '\0';
    return buff;
}

int ok_char(char c, char *char_p) {
    if (isalnum(c)) return 1;
    if (c == '\'' && char_p) {
        return isalnum(*(char_p + 1)) && isalnum(*(char_p - 1));
    }
    return 0;
}

void lower(char *word) {
    for (; *word; word++) *word = tolower(*word);
}

int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    char *word;

    while ((word = nstrtok(input_text, ok_char)) != NULL) {
        input_text = NULL;
        lower(word);

        int found = 0;
        for (int i = 0; i < nWords; i++) {
            if (strcmp(words[i].text, word) == 0) {
                words[i].count++;
                found = 1;
                break;
            }
        }

        if (!found && nWords < MAX_WORDS) {
            strncpy(words[nWords].text, word, MAX_WORD_LENGTH - 1);
            words[nWords].text[MAX_WORD_LENGTH - 1] = '\0';
            words[nWords].count = 1;
            nWords++;
        }

        free(word);
    }

    return nWords;
}