#include "phone_number.h"
#include <ctype.h>

bool check_n_digit(char input) {
    return (input >= '2' && input <= '9');
}

bool is_digit(char input) {
    return (input >= '0' && input <= '9');
}

void set_array_to_zero(char *array, size_t length) {
    memset(array, '0', length - 1);
    array[length - 1] = '\0';
}

char *phone_number_clean(const char *input) {
    char *result = malloc(sizeof(char) * (MAX_NBS + 1));
    if (!result) return NULL;

    set_array_to_zero(result, (MAX_NBS + 1));
    char *result_ptr = result;
    size_t nb_counter = 0;

    while (*input != '\0') {
        if (!isdigit((unsigned char)*input)) {
            input++;
            continue;
        }

        if (nb_counter == 0 && *input == '1') {
            input++;
            continue;
        }

        if ((nb_counter == 0 || nb_counter == 3) && !check_n_digit(*input)) {
            set_array_to_zero(result, (MAX_NBS + 1));
            return result;
        }

        if (nb_counter == MAX_NBS) {
            set_array_to_zero(result, (MAX_NBS + 1));
            return result;
        }

        *result_ptr++ = *input++;
        nb_counter++;

        if (nb_counter == MAX_NBS) {
            *result_ptr = '\0';
            return result;
        }
    }

    set_array_to_zero(result, (MAX_NBS + 1));
    return result;
}