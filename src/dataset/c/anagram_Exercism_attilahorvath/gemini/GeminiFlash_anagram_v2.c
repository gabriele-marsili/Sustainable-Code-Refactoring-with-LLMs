#include "anagram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

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
    if (bytes <= 0) return 0;

    for (int i = 0; str[i] != '\0';) {
        bool match = true;
        if (strncmp(&str[i], cp, bytes) == 0) {
            count++;
        }
        i++;
    }

    return count;
}

void downcase(char *dst, const char *src) {
    int i = 0;
    char c;
    while ((c = src[i]) != '\0' && i < MAX_STR_LEN - 1) {
        if (code_point_bytes(c) == 1) {
            dst[i] = tolower((unsigned char)c);
        } else {
            dst[i] = c;
        }
        i++;
    }
    dst[i] = '\0';
}

int is_anagram(const char *a, const char *b) {
    char aBuf[MAX_STR_LEN];
    char bBuf[MAX_STR_LEN];

    downcase(aBuf, a);
    downcase(bBuf, b);

    size_t len_a = strlen(aBuf);
    size_t len_b = strlen(bBuf);

    if (len_a != len_b) {
        return 0;
    }

    if (strncmp(aBuf, bBuf, MAX_STR_LEN) == 0) {
        return 0;
    }

    int char_counts[256] = {0};

    for (size_t i = 0; i < len_a; i++) {
        char_counts[(unsigned char)aBuf[i]]++;
        char_counts[(unsigned char)bBuf[i]]--;
    }

    for (int i = 0; i < 256; i++) {
        if (char_counts[i] != 0) {
            return 0;
        }
    }

    return 1;
}

struct Vector anagrams_for(char *word, struct Vector candidates) {
    struct Vector anagrams = {0};
    anagrams.vec = NULL;
    anagrams.size = 0;

    int size = 0;
    for (int i = 0; i < candidates.size; i++) {
        if (is_anagram(word, candidates.vec[i])) {
            size++;
        }
    }

    if (size > 0) {
        anagrams.vec = (char(*)[MAX_STR_LEN])malloc(sizeof(char[MAX_STR_LEN]) * size);
        if (anagrams.vec == NULL) {
            return anagrams;
        }
        anagrams.size = size;

        int n = 0;
        for (int i = 0; i < candidates.size; i++) {
            if (is_anagram(word, candidates.vec[i])) {
                strncpy(anagrams.vec[n], candidates.vec[i], MAX_STR_LEN - 1);
                anagrams.vec[n][MAX_STR_LEN - 1] = '\0';
                n++;
            }
        }
    }

    return anagrams;
}