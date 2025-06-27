#include "run_length_encoding.h"

#include <string.h>

bool is_digit(char chr) {
    if (chr >= '0' && chr <= '9') return (true);
    return (false);
}

char *encode(const char *text) {
    char working_array[0xffff], *aux_ptr;
    char *output, last_chr;
    size_t count, output_len;

    output_len = 0;
    count = 0;
    last_chr = *text;
    working_array[0] = '\0';
    aux_ptr = working_array;
    do {
        if (*text != last_chr) {
            if (count > 1) {
                sprintf(aux_ptr, "%zu", count);
                aux_ptr += (size_t)(log10(count) + 1);
                output_len += (size_t)(log10(count) + 1);
            }
            sprintf(aux_ptr++, "%c", last_chr);
            output_len++;
            last_chr = *text;
            count = 1;
        } else {
            count++;
        }
    } while (*text++ != '\0');
    output = calloc(sizeof(char) * (output_len + 1), '0');
    strcpy(output, working_array);
    return (output);
}

char *decode(const char *data) {
    char working_array[0xffff], *aux_ptr, *output;
    size_t count;

    count = 0;
    aux_ptr = working_array;
    while (*data != '\0') {
        count++;
        if (is_digit(*data) == true) {
            sscanf(data, "%zu", &count);
            data += (size_t)(log10(count) + 1);
            count--;
        } else {
            while (count > 0) {
                sprintf(aux_ptr++, "%c", *data);
                count--;
            }
            data++;
        }
    }
    *aux_ptr = '\0';
    output = calloc(sizeof(char) * (aux_ptr - working_array + 1), '0');
    output[aux_ptr - working_array] = '\0';
    strcpy(output, working_array);
    return (output);
}
