#include "atbash_cipher.h"

bool is_digit(const char chr) {
    return chr >= '0' && chr <= '9';
}

bool is_uppercase(const char chr) {
    return chr >= 'A' && chr <= 'Z';
}

bool is_lowercase(const char chr) {
    return chr >= 'a' && chr <= 'z';
}

int modulus(int a, int b) {
    return a < 0 ? (a + b) % b : a % b;
}

char *atbash_encode(const char *input) {
    const char *src = input;
    int input_len = 0;
    
    while (*src++) input_len++;
    
    int max_output = input_len + (input_len / GROUPS_LEN) + 1;
    char *result = malloc(max_output);
    char *dest = result;
    int count = 0;
    
    while (*input) {
        if (count == GROUPS_LEN && *(input + 1)) {
            *dest++ = ' ';
            count = 0;
        }
        
        if (*input >= 'a' && *input <= 'z') {
            *dest++ = 'z' - (*input - 'a');
            count++;
        } else if (*input >= 'A' && *input <= 'Z') {
            *dest++ = 'z' - (*input - 'A');
            count++;
        } else if (*input >= '0' && *input <= '9') {
            *dest++ = *input;
            count++;
        }
        input++;
    }
    *dest = '\0';
    return result;
}

char *atbash_decode(const char *input) {
    const char *src = input;
    int input_len = 0;
    
    while (*src++) input_len++;
    
    char *result = malloc(input_len + 1);
    char *dest = result;
    
    while (*input) {
        if (*input >= 'a' && *input <= 'z') {
            *dest++ = 'z' - (*input - 'a');
        } else if (*input >= 'A' && *input <= 'Z') {
            *dest++ = 'Z' - (*input - 'A');
        } else if (*input >= '0' && *input <= '9') {
            *dest++ = *input;
        }
        input++;
    }
    *dest = '\0';
    return result;
}