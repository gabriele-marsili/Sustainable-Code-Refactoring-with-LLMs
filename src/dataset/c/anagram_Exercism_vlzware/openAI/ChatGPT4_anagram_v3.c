#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

int mstrlen_cp(char* w, char *ref) {
    int res = 0;
    while (*w) {
        char lower = tolower(*w);
        *ref++ = lower;
        res++;
        w++;
    }
    *ref = '\0';
    return res;
}

int mstrlen_ref(char* w, const char *ref) {
    int res = 0;
    while (*w) {
        if (tolower(*w) != *ref++) {
            return -1;
        }
        res++;
        w++;
    }
    return (*ref == '\0') ? res : -1;
}

int qsortcmp(const void *a, const void *b) {
    return (*(const char *)a - *(const char *)b);
}

void anagrams_for(const char *word, struct candidates *candidates) {
    if (!word || !candidates) return;

    char sorted_word[MAX_STR_LEN];
    char lower_word[MAX_STR_LEN];
    int wlen = mstrlen_cp((char*)word, lower_word);
    memcpy(sorted_word, lower_word, wlen + 1);
    qsort(sorted_word, wlen, sizeof(char), qsortcmp);

    for (size_t i = 0; i < candidates->count; i++) {
        struct candidate *tmp = &(candidates->candidate[i]);
        char lower_candidate[MAX_STR_LEN];
        int llen = mstrlen_cp(tmp->candidate, lower_candidate);

        if (llen != wlen || mstrlen_ref(lower_candidate, lower_word) == -1) {
            tmp->is_anagram = NOT_ANAGRAM;
            continue;
        }

        qsort(lower_candidate, llen, sizeof(char), qsortcmp);
        tmp->is_anagram = (strcmp(sorted_word, lower_candidate) == 0) ? IS_ANAGRAM : NOT_ANAGRAM;
    }
}