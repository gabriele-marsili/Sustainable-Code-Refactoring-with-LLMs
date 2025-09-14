#include "phone_number.h"

static inline bool check_n_digit(char input) {
    return (input >= '2' && input <= '9');
}

static inline bool is_digit(char input) {
    return (input >= '0' && input <= '9');
}

void set_array_to_zero(char *array, size_t length) {
    memset(array, '0', length - 1);
    array[length - 1] = '\0';
}

char *phone_number_clean(const char *input) {
    char *result = malloc(MAX_NBS + 1);
    if (!result) return NULL;
    
    size_t nb_counter = 0;
    const char *current = input;
    char *output = result;
    bool found_country_code = false;
    
    while (*current && nb_counter < MAX_NBS) {
        if (!is_digit(*current)) {
            current++;
            continue;
        }
        
        if (nb_counter == 0 && *current == '1' && !found_country_code) {
            found_country_code = true;
            current++;
            continue;
        }
        
        if ((nb_counter == 0 || nb_counter == 3) && !check_n_digit(*current)) {
            set_array_to_zero(result, MAX_NBS + 1);
            return result;
        }
        
        *output++ = *current++;
        nb_counter++;
    }
    
    *output = '\0';
    
    if (nb_counter != MAX_NBS) {
        set_array_to_zero(result, MAX_NBS + 1);
    }
    
    return result;
}