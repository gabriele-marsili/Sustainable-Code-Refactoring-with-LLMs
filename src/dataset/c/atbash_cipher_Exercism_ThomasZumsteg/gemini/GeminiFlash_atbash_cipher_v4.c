#include "atbash_cipher.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

char swap_char(char c) {
    if (islower(c)) {
        return 'a' + 'z' - c;
    } else if (isupper(c)) {
        return 'a' + 'z' - (c - 'A' + 'a');
    } else if (isdigit(c)) {
        return c;
    }
    return 0;
}

char *atbash_encode(char *plaintext) {
    size_t plaintext_len = strlen(plaintext);
    char *ciphertext = malloc(sizeof(char) * (plaintext_len * 2)); // Allocate more space to avoid reallocations
    if (!ciphertext) return NULL;

    size_t i = 0;
    size_t j = 0;
    for (size_t k = 0; k < plaintext_len; k++) {
        char p = swap_char(plaintext[k]);
        if (p != 0) {
            ciphertext[j++] = p;
            i++;
            if (i % 5 == 0 && i > 0) {
                ciphertext[j++] = ' ';
            }
        }
    }

    if (j > 0 && ciphertext[j - 1] == ' ') {
        ciphertext[j - 1] = '\0';
    } else {
        ciphertext[j] = '\0';
    }

    return ciphertext;
}

char *atbash_decode(char *ciphertext) {
    size_t ciphertext_len = strlen(ciphertext);
    char *plaintext = malloc(sizeof(char) * (ciphertext_len + 1));
    if (!plaintext) return NULL;

    size_t i = 0;
    for (size_t k = 0; k < ciphertext_len; k++) {
        if (ciphertext[k] != ' ') {
            char p = swap_char(ciphertext[k]);
            if (p != 0) {
                plaintext[i++] = p;
            }
        }
    }
    plaintext[i] = '\0';
    return plaintext;
}