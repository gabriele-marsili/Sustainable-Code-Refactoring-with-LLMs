#include "atbash_cipher.h"
#include <string.h>
#include <stdlib.h>

static inline char swap_char(char c) { 
    if(c >= 'a' && c <= 'z') 
        return 'z' - c + 'a';
    else if(c >= 'A' && c <= 'Z')
        return 'z' - c + 'A';
    else if(c >= '0' && c <= '9')
        return c;
    return 0;
}

char *atbash_encode(char *plaintext) {
    size_t len = strlen(plaintext);
    size_t max_size = len + (len / 5) + 1;
    char *ciphertext = malloc(max_size);
    
    int i = 0;
    char p;
    for(char *c = plaintext; *c; c++) {
        if((p = swap_char(*c)) != 0) {
            if(i > 0 && i % 5 == 0)
                ciphertext[i++] = ' ';
            ciphertext[i++] = p;
        }
    }
    ciphertext[i] = '\0';
    return ciphertext;
}

char *atbash_decode(char *ciphertext) {
    size_t len = strlen(ciphertext);
    char *plaintext = malloc(len + 1);
    char p;
    int i = 0;
    for(char *c = ciphertext; *c; c++) {
        if((p = swap_char(*c)) != 0)
            plaintext[i++] = p;
    }
    plaintext[i] = '\0';
    return plaintext;
}