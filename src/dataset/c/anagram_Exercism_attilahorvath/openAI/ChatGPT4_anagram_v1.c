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

int code_point_count(char *str, char *cp) {
    int count = 0;
    int bytes = code_point_bytes(cp[0]);

    for (int i = 0; str[i] != '\0'; i++) {
        if (strncmp(&str[i], cp, bytes) == 0) {
            count++;
        }
    }

    return count;
}

void downcase(char *dst, const char *src) {
    int i = 0;
    while (src[i] != '\0') {
        dst[i] = (code_point_bytes(src[i]) == 1) ? tolower(src[i]) : src[i];
        i++;
    }
    dst[i] = '\0';
}

int is_anagram(char *a, char *b) {
    char aBuf[MAX_STR_LEN], bBuf[MAX_STR_LEN];
    int char_count[256] = {0};

    downcase(aBuf, a);
    downcase(bBuf, b);

    if (strlen(aBuf) != strlen(bBuf) || strcmp(aBuf, bBuf) == 0) {
        return 0;
    }

    for (int i = 0; aBuf[i] != '\0'; i++) {
        char_count[(unsigned char)aBuf[i]]++;
        char_count[(unsigned char)bBuf[i]]--;
    }

    for (int i = 0; i < 256; i++) {
        if (char_count[i] != 0) {
            return 0;
        }
    }

    return 1;
}

struct Vector anagrams_for(char *word, struct Vector candidates) {
    struct Vector anagrams = { 0 };
    anagrams.vec = (char(*)[MAX_STR_LEN])malloc(sizeof(char[MAX_STR_LEN]) * candidates.size);
    anagrams.size = 0;

    for (int i = 0; i < candidates.size; i++) {
        if (is_anagram(word, candidates.vec[i])) {
            strncpy(anagrams.vec[anagrams.size], candidates.vec[i], MAX_STR_LEN);
            anagrams.size++;
        }
    }

    return anagrams;
}