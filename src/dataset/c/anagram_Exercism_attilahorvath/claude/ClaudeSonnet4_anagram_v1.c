#include "anagram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_VEC_SIZE 128

static inline int code_point_bytes(char c) {
    if ((c & 0x80) == 0) return 1;
    if ((c & 0xE0) == 0xC0) return 2;
    if ((c & 0xF0) == 0xE0) return 3;
    if ((c & 0xF8) == 0xF0) return 4;
    return -1;
}

int code_point_count(char *str, char *cp) {
    int count = 0;
    int bytes = code_point_bytes(cp[0]);
    if (bytes <= 0) return 0;
    
    int str_len = strlen(str);
    int cp_len = bytes;
    
    for (int i = 0; i <= str_len - cp_len; i++) {
        if (memcmp(str + i, cp, cp_len) == 0) {
            count++;
        }
    }
    
    return count;
}

void downcase(char *dst, char *src) {
    int i = 0;
    char c;
    
    while ((c = src[i]) != '\0' && i < MAX_STR_LEN - 1) {
        dst[i] = (code_point_bytes(c) == 1) ? tolower(c) : c;
        i++;
    }
    
    dst[i] = '\0';
}

int is_anagram(char *a, char *b) {
    char aBuf[MAX_STR_LEN];
    char bBuf[MAX_STR_LEN];
    
    downcase(aBuf, a);
    downcase(bBuf, b);
    
    int len_a = strlen(aBuf);
    int len_b = strlen(bBuf);
    
    if (len_a != len_b || strcmp(aBuf, bBuf) == 0) {
        return 0;
    }
    
    int i = 0;
    while (i < len_a) {
        char c = aBuf[i];
        int bytes = code_point_bytes(c);
        if (bytes <= 0) return 0;
        
        if (code_point_count(aBuf, aBuf + i) != code_point_count(bBuf, aBuf + i)) {
            return 0;
        }
        
        i += bytes;
    }
    
    return 1;
}

struct Vector anagrams_for(char *word, struct Vector candidates) {
    struct Vector anagrams = { 0 };
    
    if (candidates.size == 0) return anagrams;
    
    char *matches = calloc(candidates.size, sizeof(char));
    if (!matches) return anagrams;
    
    int size = 0;
    int max_check = (candidates.size < MAX_VEC_SIZE) ? candidates.size : MAX_VEC_SIZE;
    
    for (int i = 0; i < max_check; i++) {
        if (is_anagram(word, candidates.vec[i])) {
            size++;
            matches[i] = 1;
        }
    }
    
    if (size > 0) {
        anagrams.vec = malloc(sizeof(char[MAX_STR_LEN]) * size);
        if (anagrams.vec) {
            anagrams.size = size;
            int n = 0;
            
            for (int i = 0; i < max_check && n < size; i++) {
                if (matches[i]) {
                    strcpy(anagrams.vec[n], candidates.vec[i]);
                    n++;
                }
            }
        }
    }
    
    free(matches);
    return anagrams;
}