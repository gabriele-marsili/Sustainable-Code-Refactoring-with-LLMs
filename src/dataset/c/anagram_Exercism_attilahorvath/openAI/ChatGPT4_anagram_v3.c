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

    for (int i = 0; str[i] != '\0';) {
        if (strncmp(&str[i], cp, bytes) == 0) {
            count++;
        }
        i += code_point_bytes(str[i]);
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

int is_anagram(const char *a, const char *b) {
    char aBuf[MAX_STR_LEN], bBuf[MAX_STR_LEN];
    downcase(aBuf, a);
    downcase(bBuf, b);

    if (strlen(aBuf) != strlen(bBuf) || strcmp(aBuf, bBuf) == 0) {
        return 0;
    }

    for (int i = 0; aBuf[i] != '\0';) {
        if (code_point_count(aBuf, &aBuf[i]) != code_point_count(bBuf, &aBuf[i])) {
            return 0;
        }
        i += code_point_bytes(aBuf[i]);
    }

    return 1;
}

struct Vector anagrams_for(const char *word, struct Vector candidates) {
    struct Vector anagrams = { 0 };
    int matches[MAX_VEC_SIZE] = { 0 };
    int size = 0;

    for (int i = 0; i < candidates.size && i < MAX_VEC_SIZE; i++) {
        if (is_anagram(word, candidates.vec[i])) {
            matches[i] = 1;
            size++;
        }
    }

    if (size > 0) {
        anagrams.vec = malloc(sizeof(char[MAX_STR_LEN]) * size);
        anagrams.size = size;

        for (int i = 0, n = 0; i < candidates.size && n < size; i++) {
            if (matches[i]) {
                strncpy(anagrams.vec[n], candidates.vec[i], MAX_STR_LEN - 1);
                anagrams.vec[n][MAX_STR_LEN - 1] = '\0';
                n++;
            }
        }
    }

    return anagrams;
}