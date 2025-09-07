#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>

int comp(const void* element_1, const void* element_2) {
    return *(const char*)element_1 - *(const char*)element_2;
}

char *lower(const char word[MAX_STR_LEN]) {
    int len = strlen(word);
    char *word_lower = malloc(len + 1);
    for(int i = 0; i < len; i++)
        word_lower[i] = tolower(word[i]);
    word_lower[len] = '\0';
    return word_lower;
}

char *letters(const char word[MAX_STR_LEN]) {
    int len = strlen(word);
    char *letters = malloc(len + 1);
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
    
    int i = 0;
    while(i < len1 && tolower(word1[i]) == tolower(word2[i]))
        i++;
    
    if(i == len1)
        return 0;
    
    char *letters1 = letters(word1);
    char *letters2 = letters(word2);
    int result = !strcmp(letters1, letters2);
    free(letters1);
    free(letters2);
    return result;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };
    
    char *anagram_letters = letters(anagram);
    
    for(int i = 0; i < words.size; i++) {
        if(strlen(words.vec[i]) == strlen(anagram)) {
            int j = 0;
            int len = strlen(anagram);
            while(j < len && tolower(words.vec[i][j]) == tolower(anagram[j]))
                j++;
            
            if(j == len) {
                continue;
            }
            
            char *word_letters = letters(words.vec[i]);
            if(!strcmp(word_letters, anagram_letters)) {
                matches.vec[matches.size] = malloc(strlen(words.vec[i]) + 1);
                strcpy(matches.vec[matches.size], words.vec[i]);
                matches.size++;
            }
            free(word_letters);
        }
    }
    
    free(anagram_letters);
    return matches;
}