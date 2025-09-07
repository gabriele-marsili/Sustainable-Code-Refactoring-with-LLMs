#include "atbash_cipher.h"
#include <ctype.h>

char *atbash_encode(const char *input) {
    int len = 0;
    int count = 0;
    char *result = malloc(sizeof(char) * (MAX_OUTPUT));
    char *result_ptr = result;

    while (*input != '\0') {
        char c = *input;
        if (isalnum(c)) {
            if (count == GROUPS_LEN && len > 0) {
                *result_ptr++ = ' ';
                len++;
                count = 0;
            }

            if (isalpha(c)) {
                c = tolower(c);
                *result_ptr++ = 'a' + ('z' - c);
            } else {
                *result_ptr++ = c;
            }
            count++;
            len++;
        }
        input++;
    }
    *result_ptr = '\0';
    return result;
}

char *atbash_decode(const char *input) {
    int len = 0;
    char *result = malloc(sizeof(char) * (MAX_OUTPUT));
    char *result_ptr = result;

    while (*input != '\0') {
        char c = *input;
        if (isalnum(c)) {
            if (isalpha(c)) {
                c = tolower(c);
                *result_ptr++ = 'a' + ('z' - c);
            } else {
                *result_ptr++ = c;
            }
            len++;
        }
        input++;
    }
    *result_ptr = '\0';
    return result;
}