#include "atbash_cipher.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

static inline char swap_char(char c) { 
    if('a' <= c && c <= 'z') 
        return 'z' - (c - 'a');
    if('A' <= c && c <= 'Z')
        return 'Z' - (c - 'A');
    if(isdigit(c))
        return c;
    return 0;
}

char *atbash_encode(char *plaintext) {
    size_t len = strlen(plaintext);
    char *ciphertext = malloc(len * 2 / 5 + len + 1); // Preallocate max possible size
    if (!ciphertext) return NULL;

    int i = 0, count = 0;
    for (char *c = plaintext; *c; c++) {
        char p = swap_char(*c);
        if (p) {
            ciphertext[i++] = p;
            if (++count % 5 == 0) {
                ciphertext[i++] = ' ';
            }
        }
    }
    if (i > 0 && ciphertext[i - 1] == ' ')
        i--; // Remove trailing space
    ciphertext[i] = '\0';
    return ciphertext;
}

char *atbash_decode(char *ciphertext) {
    size_t len = strlen(ciphertext);
    char *plaintext = malloc(len + 1); // Allocate exact size
    if (!plaintext) return NULL;

    int i = 0;
    for (char *c = ciphertext; *c; c++) {
        char p = swap_char(*c);
        if (p)
            plaintext[i++] = p;
    }
    plaintext[i] = '\0';
    return plaintext;
}