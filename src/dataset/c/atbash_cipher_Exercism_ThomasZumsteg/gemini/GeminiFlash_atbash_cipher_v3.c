#include "atbash_cipher.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

char swap_char(char c) {
    if (islower(c)) {
        return 'a' + 'z' - c;
    } else if (isupper(c)) {
        return 'A' + 'Z' - c + 32;
    } else if (isdigit(c)) {
        return c;
    }
    return 0;
}

char *atbash_encode(char *plaintext) {
    size_t plaintext_len = strlen(plaintext);
    size_t ciphertext_max_len = plaintext_len * 2;
    char *ciphertext = malloc(ciphertext_max_len + 1);
    if (!ciphertext) return NULL;

    int i = 0;
    int count = 0;
    for (size_t j = 0; j < plaintext_len; j++) {
        char c = plaintext[j];
        char p = swap_char(c);
        if (p != 0) {
            ciphertext[i++] = p;
            count++;
            if (count % 5 == 0) {
                ciphertext[i++] = ' ';
            }
        }
    }

    if (i > 0 && ciphertext[i - 1] == ' ') {
        i--;
    }
    ciphertext[i] = '\0';

    return ciphertext;
}

char *atbash_decode(char *ciphertext) {
    size_t ciphertext_len = strlen(ciphertext);
    char *plaintext = malloc(ciphertext_len + 1);
    if (!plaintext) return NULL;

    int i = 0;
    for (size_t j = 0; j < ciphertext_len; j++) {
        char c = ciphertext[j];
        if (c == ' ') continue;
        char p = swap_char(c);
        if (p != 0) {
            plaintext[i++] = p;
        }
    }
    plaintext[i] = '\0';
    return plaintext;
}