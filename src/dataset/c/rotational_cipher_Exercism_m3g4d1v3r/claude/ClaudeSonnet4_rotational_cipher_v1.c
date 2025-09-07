#include "rotational_cipher.h"

char *rotate(const char *text, int shift_key) {
    size_t input_len = strlen(text);
    if (input_len == 0) return NULL;
    
    char *result = malloc(input_len + 1);
    if (result == NULL) return NULL;
    
    // Normalize shift_key to avoid repeated modulo operations
    shift_key = ((shift_key % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;
    
    char *dest = result;
    const char *src = text;
    
    while (*src) {
        char c = *src++;
        if (c >= 'a' && c <= 'z') {
            *dest++ = ((c - 'a' + shift_key) % ALPHABET_SIZE) + 'a';
        } else if (c >= 'A' && c <= 'Z') {
            *dest++ = ((c - 'A' + shift_key) % ALPHABET_SIZE) + 'A';
        } else {
            *dest++ = c;
        }
    }
    *dest = '\0';
    
    return result;
}