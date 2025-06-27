#include "phone_number.h"

bool check_n_digit(char input) {
    if (input >= '2' && input <= '9') return (true);
    return (false);
}

bool is_digit(char input) {
    if (input >= '0' && input <= '9') return (true);
    return (false);
}

void set_array_to_zero(char *array, size_t length) {
    for (size_t idx = 0; idx < (length - 1); idx++) {
        array[idx] = '0';
    }
    array[length - 1] = '\0';
}

char *phone_number_clean(const char *input) {
    char *result;
    size_t input_len;
    size_t nb_counter;
    size_t c_counter;

    input_len = strlen(input);
    result = malloc(sizeof(char) * (MAX_NBS + 1));
    set_array_to_zero(result, (MAX_NBS + 1));
    nb_counter = 0;
    c_counter = 0;
    while (*input != '\0' && nb_counter < input_len) {
        if (is_digit(*input) == false) {
            input++;
            continue;
        }
        if (nb_counter == 0) {
            if (*input == '1') {    // NANP number
                input++;
                c_counter++;
                continue;
            }
        }
        if (nb_counter == 0 || nb_counter == 3) {
            if (check_n_digit(*input) == false) {
                result -= nb_counter;
                set_array_to_zero(result, (MAX_NBS + 1));
                return (result);
            }
        }
        if (nb_counter == MAX_NBS) {
            result -= nb_counter;
            set_array_to_zero(result, (MAX_NBS + 1));
            return (result);
        }
        *result++ = *input++;
        nb_counter++;
    }
    *result = '\0';
    result -= nb_counter;
    if (nb_counter != MAX_NBS) {
        set_array_to_zero(result, (MAX_NBS + 1));
    }
    return (result);
}
