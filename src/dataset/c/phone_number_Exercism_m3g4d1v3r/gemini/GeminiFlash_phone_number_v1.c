#include "phone_number.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
    char *result = malloc(MAX_NBS + 1);
    if (!result) return NULL;

    char *result_ptr = result;
    size_t nb_counter = 0;

    for (; *input != '\0'; ++input) {
        if (isdigit((unsigned char)*input)) {
            if (nb_counter == 0 && *input == '1') {
                continue;
            }

            if ((nb_counter == 0 || nb_counter == 3) && (*input < '2' || *input > '9')) {
                free(result);
                return NULL;
            }

            if (nb_counter == MAX_NBS) {
                free(result);
                return NULL;
            }

            *result_ptr++ = *input;
            nb_counter++;
        }
    }

    *result_ptr = '\0';

    if (nb_counter != MAX_NBS) {
        free(result);
        return NULL;
    }

    return result;
}