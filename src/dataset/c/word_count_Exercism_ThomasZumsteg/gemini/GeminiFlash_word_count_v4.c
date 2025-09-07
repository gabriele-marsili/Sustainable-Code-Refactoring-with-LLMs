#include "word_count.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

static char *nstrtok(char *text, bool (*test)(char, char*)) {
    static char *text_p;
    if (text != NULL) {
        text_p = text;
    }

    if (text_p == NULL || *text_p == '\0') {
        return NULL;
    }

    while (*text_p && !test(*text_p, text_p)) {
        text_p++;
    }

    if (*text_p == '\0') {
        return NULL;
    }

    char *start = text_p;
    while (*text_p && test(*text_p, text_p)) {
        text_p++;
    }

    size_t len = text_p - start;
    if (len == 0) return NULL;

    if (len >= MAX_WORD_LENGTH) {
        len = MAX_WORD_LENGTH - 1;
    }

    char *word = malloc(len + 1);
    if (!word) return NULL;

    strncpy(word, start, len);
    word[len] = '\0';

    return word;
}

static bool ok_char(char c, char *char_p) {
    if (isalnum(c)) {
        return true;
    } else if (c == '\'' && char_p != NULL && char_p[1] != '\0' && char_p > (char*)0x1 && isalnum(char_p[1]) && isalnum(char_p[-1])) {
        return true;
    }
    return false;
}

static void lower(char *word) {
    for (char *p = word; *p; p++) {
        *p = tolower((unsigned char)*p);
    }
}

int word_count(char *input_text, WordCount_Word_t words[MAX_WORDS]) {
    int nWords = 0;
    char *word;

    for (word = nstrtok(input_text, ok_char); word != NULL; word = nstrtok(NULL, ok_char)) {
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
            }
        }
        free(word);
    }

    return nWords;
}