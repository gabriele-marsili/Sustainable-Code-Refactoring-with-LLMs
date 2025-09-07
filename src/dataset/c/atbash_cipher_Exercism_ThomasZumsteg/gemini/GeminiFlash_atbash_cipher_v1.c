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
        ciphertext[i - 1] = '\0';
    } else {
        ciphertext[i] = '\0';
    }

    return ciphertext;
}

char *atbash_decode(char *ciphertext) {
    size_t ciphertext_len = strlen(ciphertext);
    char *plaintext = malloc(sizeof(char) * (ciphertext_len + 1));
    if (!plaintext) return NULL;

    int i = 0;
    for (size_t j = 0; j < ciphertext_len; j++) {
        char c = ciphertext[j];
        if (isspace(c)) continue;
        char p = swap_char(c);
        if (p != 0) {
            plaintext[i++] = p;
        }
    }
    plaintext[i] = '\0';
    return plaintext;
}