#include "atbash_cipher.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

static inline char swap_char(char c) { 
    if('a' <= c && c <= 'z') 
        return 'a' + 'z' - c;
    if('A' <= c && c <= 'Z')
        return 'A' + 'Z' - c;
    if(isdigit(c))
        return c;
    return 0;
}

char *atbash_encode(const char *plaintext) {
    size_t len = strlen(plaintext);
    char *ciphertext = malloc(len + len / 5 + 2); // Allocate enough space for spaces and null terminator
    if (!ciphertext) return NULL;

    size_t i = 0, j = 0;
    for (; plaintext[i]; i++) {
        char p = swap_char(plaintext[i]);
        if (p) {
            ciphertext[j++] = p;
            if (j % 6 == 5) ciphertext[j++] = ' ';
        }
    }
    if (j > 0 && ciphertext[j - 1] == ' ')
        j--; // Remove trailing space
    ciphertext[j] = '\0';
    return ciphertext;
}

char *atbash_decode(const char *ciphertext) {
    size_t len = strlen(ciphertext);
    char *plaintext = malloc(len + 1); // Allocate exact space needed
    if (!plaintext) return NULL;

    size_t i = 0;
    for (; *ciphertext; ciphertext++) {
        char p = swap_char(*ciphertext);
        if (p) plaintext[i++] = p;
    }
    plaintext[i] = '\0';
    return plaintext;
}