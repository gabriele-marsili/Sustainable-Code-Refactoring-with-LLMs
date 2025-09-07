#include "atbash_cipher.h"
#include <ctype.h>

char *atbash_encode(const char *input) {
    int len = 0;
    int count = 0;
    char *result = malloc(sizeof(char) * (MAX_OUTPUT));
    char *result_start = result;

    while (*input) {
        char c = *input;
        if (isalnum(c)) {
            if (count == GROUPS_LEN && len > 0) {
                *result++ = ' ';
                len++;
                count = 0;
            }

            if (isalpha(c)) {
                c = tolower(c);
                *result++ = 'a' + ('z' - c);
            } else {
                *result++ = c;
            }
            len++;
            count++;
        }
        input++;
    }
    *result = '\0';
    return result_start;
}

char *atbash_decode(const char *input) {
    int len = 0;
    char *result = malloc(sizeof(char) * (MAX_OUTPUT));
    char *result_start = result;

    while (*input) {
        char c = *input;
        if (isalnum(c)) {
            if (isalpha(c)) {
                c = tolower(c);
                *result++ = 'a' + ('z' - c);
            } else {
                *result++ = c;
            }
            len++;
        }
        input++;
    }
    *result = '\0';
    return result_start;
}