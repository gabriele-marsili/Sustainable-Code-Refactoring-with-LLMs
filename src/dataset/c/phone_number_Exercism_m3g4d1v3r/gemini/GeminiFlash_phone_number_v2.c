#include "phone_number.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
    char *result = malloc(sizeof(char) * (MAX_NBS + 1));
    if (!result) return NULL;

    memset(result, '0', MAX_NBS);
    result[MAX_NBS] = '\0';

    size_t nb_counter = 0;
    const char *input_ptr = input;

    while (*input_ptr != '\0') {
        if (isdigit((unsigned char)*input_ptr)) {
            if (nb_counter == 0 && *input_ptr == '1') {
                input_ptr++;
                continue;
            }

            if ((nb_counter == 0 || nb_counter == 3) && (*input_ptr < '2' || *input_ptr > '9')) {
                memset(result, '0', MAX_NBS);
                result[MAX_NBS] = '\0';
                return result;
            }

            if (nb_counter == MAX_NBS) {
                memset(result, '0', MAX_NBS);
                result[MAX_NBS] = '\0';
                return result;
            }

            result[nb_counter++] = *input_ptr;
        }
        input_ptr++;
    }

    if (nb_counter != MAX_NBS) {
        memset(result, '0', MAX_NBS);
        result[MAX_NBS] = '\0';
    }

    return result;
}