#include "atbash_cipher.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

static inline char swap_char(char c) { 
    if ('a' <= c && c <= 'z') 
        return 'z' - (c - 'a');
    if ('A' <= c && c <= 'Z')
        return 'Z' - (c - 'A');
    return c;
}

char *atbash_encode(char *plaintext) {
    size_t len = strlen(plaintext);
    char *ciphertext = malloc(len * 2 / 5 + len + 1);
    if (!ciphertext) return NULL;

    size_t i = 0, j = 0;
    for (; plaintext[i]; i++) {
        char p = swap_char(plaintext[i]);
        if (isalnum(p)) {
            ciphertext[j++] = p;
            if (j % 6 == 5) ciphertext[j++] = ' ';
        }
    }
    if (j > 0 && ciphertext[j - 1] == ' ')
        j--;
    ciphertext[j] = '\0';
    return ciphertext;
}

char *atbash_decode(char *ciphertext) {
    size_t len = strlen(ciphertext);
    char *plaintext = malloc(len + 1);
    if (!plaintext) return NULL;

    size_t i = 0, j = 0;
    for (; ciphertext[i]; i++) {
        char p = swap_char(ciphertext[i]);
        if (isalnum(p)) {
            plaintext[j++] = p;
        }
    }
    plaintext[j] = '\0';
    return plaintext;
}