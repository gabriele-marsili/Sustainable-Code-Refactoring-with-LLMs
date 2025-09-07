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
    size_t ciphertext_max_len = plaintext_len * 2; // Account for spaces
    char *ciphertext = malloc(ciphertext_max_len + 1); // +1 for null terminator
    if (!ciphertext) return NULL; // Handle allocation failure

    size_t i = 0;
    size_t char_count = 0;
    for (size_t j = 0; j < plaintext_len; j++) {
        char c = plaintext[j];
        char p = swap_char(c);
        if (p != 0) {
            ciphertext[i++] = p;
            char_count++;
            if (char_count % 5 == 0 && char_count > 0) {
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

    size_t i = 0;
    for (size_t j = 0; j < ciphertext_len; j++) {
        char c = ciphertext[j];
        if (c == ' ') continue; // Skip spaces in ciphertext
        char p = swap_char(c);
        if (p != 0) {
            plaintext[i++] = p;
        }
    }
    plaintext[i] = '\0';
    return plaintext;
}