#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>

int comp(const void* element_1, const void* element_2) {
    return *((char *)element_1) - *((char *)element_2);
}

char *lower(const char word[MAX_STR_LEN]) {
    int len = strlen(word);
    char *word_lower = malloc(sizeof(char) * (len + 1));
    for(int i = 0; i < len; i++)
        word_lower[i] = tolower(word[i]);
    word_lower[len] = '\0';
    return word_lower;
}

char *letters(const char word[MAX_STR_LEN]) {
    int len = strlen(word);
    char *letters = malloc(sizeof(char) * (len + 1));
    for(int i = 0; i < len; i++)
        letters[i] = tolower(word[i]);
    letters[len] = '\0';
    qsort(letters, len, sizeof(char), comp);
    return letters;
}

int is_anagram(const char *word1, const char *word2) {
    int len1 = strlen(word1);
    int len2 = strlen(word2);
    
    if(len1 != len2)
        return 0;
    
    char *lower1 = lower(word1);
    char *lower2 = lower(word2);
    
    if(!strcmp(lower1, lower2)) {
        free(lower1);
        free(lower2);
        return 0;
    }
    
    qsort(lower1, len1, sizeof(char), comp);
    qsort(lower2, len2, sizeof(char), comp);
    
    int result = !strcmp(lower1, lower2);
    free(lower1);
    free(lower2);
    return result;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };
    for(int i = 0; i < words.size; i++) {
        if(is_anagram(words.vec[i], anagram)) {
            matches.vec[matches.size] = malloc(strlen(words.vec[i]) + 1);
            strcpy(matches.vec[matches.size], words.vec[i]);
            matches.size++;
        }
    }
    return matches;
}