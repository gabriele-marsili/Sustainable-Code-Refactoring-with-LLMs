#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

static inline int char_frequency_hash(const char *str, int *freq) {
    int len = 0;
    memset(freq, 0, 26 * sizeof(int));
    
    while (*str) {
        char c = tolower(*str);
        if (c >= 'a' && c <= 'z') {
            freq[c - 'a']++;
            len++;
        }
        str++;
    }
    return len;
}

static inline int compare_frequencies(const int *freq1, const int *freq2) {
    for (int i = 0; i < 26; i++) {
        if (freq1[i] != freq2[i]) {
            return 0;
        }
    }
    return 1;
}

int mstrlen_cp(char* w, char *ref)
{
    int res = 0;
    while (*w) {
        *w = tolower(*w);
        *ref++ = *w;
        res++;
        w++;
    }
    *ref = '\0';
    return res;
}

int mstrlen_ref(char* w, char *ref)
{
    int res = 0;
    int same = 0;
    while (*w) {
        *w = tolower(*w);
        if (ref && *ref && (*w == *ref)) {
            same++;
            ref++;
        }
        res++;
        w++;
    }
    if (res == same)
        return -1;
    return res;
}

int qsortcmp(const void *a, const void *b)
{
    const char *p = (const char *) a;
    const char *q = (const char *) b;
    return (*p - *q);
}

void anagrams_for(const char *word, struct candidates *candidates)
{
    if ((word == NULL) || (candidates == NULL))
        return;

    int word_freq[26];
    int word_len = char_frequency_hash(word, word_freq);
    
    for (int i = 0; i < (int)candidates->count; i++) {
        struct candidate *tmp = &(candidates->candidate[i]);
        
        int candidate_freq[26];
        int candidate_len = char_frequency_hash(tmp->candidate, candidate_freq);
        
        if (candidate_len != word_len) {
            tmp->is_anagram = NOT_ANAGRAM;
        } else {
            tmp->is_anagram = compare_frequencies(word_freq, candidate_freq) ? IS_ANAGRAM : NOT_ANAGRAM;
        }
    }
}