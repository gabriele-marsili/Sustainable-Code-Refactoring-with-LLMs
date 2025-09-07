#include "anagram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_VEC_SIZE 128

int code_point_bytes(char c) {
    if ((c & 0x80) == 0) {
        return 1;
    } else if ((c & 0xE0) == 0xC0) {
        return 2;
    } else if ((c & 0xF0) == 0xE0) {
        return 3;
    } else if ((c & 0xF8) == 0xF0) {
        return 4;
    }
    return -1;
}

int code_point_count(const char *str, const char *cp) {
    int count = 0;
    int bytes = code_point_bytes(cp[0]);

    for (const char *p = str; *p != '\0'; p += code_point_bytes(*p)) {
        if (strncmp(p, cp, bytes) == 0) {
            count++;
        }
    }

    return count;
}

void downcase(char *dst, const char *src) {
    while (*src) {
        *dst++ = (code_point_bytes(*src) == 1) ? tolower(*src) : *src;
        src++;
    }
    *dst = '\0';
}

int is_anagram(const char *a, const char *b) {
    char aBuf[MAX_STR_LEN], bBuf[MAX_STR_LEN];
    int char_count[256] = {0};

    downcase(aBuf, a);
    downcase(bBuf, b);

    if (strlen(aBuf) != strlen(bBuf)) {
        return 0;
    }

    for (const char *p = aBuf; *p; p++) {
        char_count[(unsigned char)*p]++;
    }

    for (const char *p = bBuf; *p; p++) {
        if (--char_count[(unsigned char)*p] < 0) {
            return 0;
        }
    }

    return 1;
}

struct Vector anagrams_for(const char *word, struct Vector candidates) {
    struct Vector anagrams = { 0 };
    anagrams.vec = (char(*)[MAX_STR_LEN])malloc(sizeof(char[MAX_STR_LEN]) * candidates.size);
    anagrams.size = 0;

    for (int i = 0; i < candidates.size; i++) {
        if (is_anagram(word, candidates.vec[i])) {
            strncpy(anagrams.vec[anagrams.size++], candidates.vec[i], MAX_STR_LEN);
        }
    }

    return anagrams;
}