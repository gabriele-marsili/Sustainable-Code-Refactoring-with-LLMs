#include "phone_number.h"
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <stdbool.h>

void clean_invalid_number(char *input) {
    memset(input, '0', 10);
    input[10] = '\0';
}

char *phone_number_clean(const char *input) {
    char *result = (char *)malloc(11 * sizeof(char));
    if (result == NULL) {
        return NULL; 
    }
    int j = 0;
    size_t len = strlen(input);
    for (size_t i = 0; i < len; ++i) {
        if (isdigit(input[i])) {
            result[j++] = input[i];
            if (j == 10) break;
        }
    }
    result[j] = '\0';

    if (strlen(result) != 10 || result[0] < '2' || result[3] < '2') {
        clean_invalid_number(result);
    }
    return result;
}