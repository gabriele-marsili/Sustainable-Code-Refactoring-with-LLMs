#include "atbash_cipher.h"
#include <string.h>
#include <stdlib.h>

char swap_char(char c) { 
    if(c >= 'a' && c <= 'z') 
        return 'z' - c + 'a';
    else if(c >= 'A' && c <= 'Z')
        return 'Z' - c + 'A';
    else if(c >= '0' && c <= '9')
        return c;
    return 0;
}

char *atbash_encode(char *plaintext) {
    size_t len = strlen(plaintext);
    size_t max_size = len + (len / 5) + 1;
    char *ciphertext = malloc(max_size);
    
    int i = 0;
    int group_count = 0;
    
    for(char *c = plaintext; *c; c++) {
        char p = swap_char(*c);
        if(p != 0) {
            if(group_count == 5) {
                ciphertext[i++] = ' ';
                group_count = 0;
            }
            ciphertext[i++] = p;
            group_count++;
        }
    }
    
    ciphertext[i] = '\0';
    return ciphertext;
}

char *atbash_decode(char *ciphertext) {
    size_t len = strlen(ciphertext);
    char *plaintext = malloc(len + 1);
    
    int i = 0;
    for(char *c = ciphertext; *c; c++) {
        if(*c != ' ') {
            char p = swap_char(*c);
            if(p != 0)
                plaintext[i++] = p;
        }
    }
    
    plaintext[i] = '\0';
    return plaintext;
}