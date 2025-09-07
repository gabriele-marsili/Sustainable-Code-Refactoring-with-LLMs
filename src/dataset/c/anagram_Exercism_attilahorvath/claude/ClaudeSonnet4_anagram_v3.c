#include "anagram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_VEC_SIZE 128

static inline int code_point_bytes(unsigned char c) {
    if (c < 0x80) return 1;
    if ((c & 0xE0) == 0xC0) return 2;
    if ((c & 0xF0) == 0xE0) return 3;
    if ((c & 0xF8) == 0xF0) return 4;
    return -1;
}

int code_point_count(char *str, char *cp) {
    int count = 0;
    int bytes = code_point_bytes((unsigned char)cp[0]);
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
        dst[i] = (code_point_bytes((unsigned char)c) == 1) ? tolower(c) : c;
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
    
    int freq_a[256] = {0};
    int freq_b[256] = {0};
    
    for (int i = 0; i < len_a; i++) {
        freq_a[(unsigned char)aBuf[i]]++;
        freq_b[(unsigned char)bBuf[i]]++;
    }
    
    return memcmp(freq_a, freq_b, sizeof(freq_a)) == 0;
}

struct Vector anagrams_for(char *word, struct Vector candidates) {
    struct Vector anagrams = { 0 };
    
    int max_candidates = (candidates.size < MAX_VEC_SIZE) ? candidates.size : MAX_VEC_SIZE;
    char *matches[MAX_VEC_SIZE];
    int match_count = 0;
    
    for (int i = 0; i < max_candidates; i++) {
        if (is_anagram(word, candidates.vec[i])) {
            matches[match_count++] = candidates.vec[i];
        }
    }
    
    if (match_count > 0) {
        anagrams.vec = (char(*)[MAX_STR_LEN])malloc(sizeof(char[MAX_STR_LEN]) * match_count);
        anagrams.size = match_count;
        
        for (int i = 0; i < match_count; i++) {
            strncpy(anagrams.vec[i], matches[i], MAX_STR_LEN - 1);
            anagrams.vec[i][MAX_STR_LEN - 1] = '\0';
        }
    }
    
    return anagrams;
}