#include "phone_number.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

void clean_invalid_number(char *input) {
    memset(input, '0', 10);
    input[10] = '\0';
}

char *phone_number_clean(const char *input) {
    char *result = (char *)calloc(11, sizeof(char));
    int j = 0;

    for (int i = 0; input[i] != '\0' && j < 10; i++) {
        if (isdigit(input[i])) {
            if (j == 0 && input[i] == '1') continue;
            result[j++] = input[i];
        }
    }

    if (j != 10 || result[0] < '2' || result[3] < '2') {
        clean_invalid_number(result);
    }

    return result;
}