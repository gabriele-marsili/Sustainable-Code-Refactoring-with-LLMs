#include "phone_number.h"

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
    
    size_t nb_counter = 0;
    const char *current = input;
    char *write_pos = result;
    
    while (*current != '\0') {
        if (!is_digit(*current)) {
            current++;
            continue;
        }
        
        if (nb_counter == 0 && *current == '1') {
            current++;
            continue;
        }
        
        if ((nb_counter == 0 || nb_counter == 3) && !check_n_digit(*current)) {
            set_array_to_zero(result, MAX_NBS + 1);
            return result;
        }
        
        if (nb_counter >= MAX_NBS) {
            set_array_to_zero(result, MAX_NBS + 1);
            return result;
        }
        
        *write_pos++ = *current++;
        nb_counter++;
    }
    
    *write_pos = '\0';
    
    if (nb_counter != MAX_NBS) {
        set_array_to_zero(result, MAX_NBS + 1);
    }
    
    return result;
}