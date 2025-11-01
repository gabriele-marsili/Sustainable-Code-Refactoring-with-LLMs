#include "phone_number.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
    return phone_number_clean_v2(input);
}

char *phone_number_clean_v2(const char *input) {
    const int phone_number_size = 10;
    char *output = calloc(phone_number_size + 1, sizeof(char));
    if (!output) return NULL;

    int output_size = 0;

    for (const char *c = input; *c != '\0'; c++) {
        if (!isdigit(*c)) continue;

        if (output_size == 0 && *c == '1') continue;

        if ((output_size == 0 || output_size == 3) && (*c == '0' || *c == '1')) {
            strcpy(output, "0000000000");
            return output;
        }

        if (output_size >= phone_number_size) {
            strcpy(output, "0000000000");
            return output;
        }

        output[output_size++] = *c;
    }

    if (output_size != phone_number_size) {
        strcpy(output, "0000000000");
    }

    return output;
}

char *phone_number_clean_v1(const char *input) {
    const int phone_number_size = 10;
    char *output = calloc(phone_number_size + 1, sizeof(char));
    if (!output) return NULL;

    int output_size = 0;

    for (const char *c = input; *c != '\0'; c++) {
        if (!isdigit(*c)) continue;

        if (output_size == 0 && *c == '1') continue;

        if ((output_size == 0 || output_size == 3) && (*c == '0' || *c == '1')) {
            strcpy(output, "0000000000");
            return output;
        }

        if (output_size >= phone_number_size) {
            strcpy(output, "0000000000");
            return output;
        }

        output[output_size++] = *c;
    }

    if (output_size != phone_number_size) {
        strcpy(output, "0000000000");
    }

    return output;
}