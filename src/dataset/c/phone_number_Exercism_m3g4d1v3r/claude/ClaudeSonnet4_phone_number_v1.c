#include "phone_number.h"

static inline bool check_n_digit(char input) {
    return (input >= '2' && input <= '9');
}

static inline bool is_digit(char input) {
    return (input >= '0' && input <= '9');
}

static void set_array_to_zero(char *array, size_t length) {
    memset(array, '0', length - 1);
    array[length - 1] = '\0';
}

char *phone_number_clean(const char *input) {
    char *result = malloc(sizeof(char) * (MAX_NBS + 1));
    if (!result) return NULL;
    
    size_t nb_counter = 0;
    const char *current = input;
    char *write_pos = result;
    
    // Skip leading '1' for NANP numbers
    while (*current && !is_digit(*current)) current++;
    if (*current == '1') {
        current++;
        while (*current && !is_digit(*current)) current++;
    }
    
    // Process digits
    while (*current && nb_counter < MAX_NBS) {
        if (!is_digit(*current)) {
            current++;
            continue;
        }
        
        // Check first digit of area code and exchange code
        if ((nb_counter == 0 || nb_counter == 3) && !check_n_digit(*current)) {
            set_array_to_zero(result, MAX_NBS + 1);
            return result;
        }
        
        *write_pos++ = *current++;
        nb_counter++;
    }
    
    // Check for extra digits
    while (*current) {
        if (is_digit(*current)) {
            set_array_to_zero(result, MAX_NBS + 1);
            return result;
        }
        current++;
    }
    
    if (nb_counter == MAX_NBS) {
        *write_pos = '\0';
    } else {
        set_array_to_zero(result, MAX_NBS + 1);
    }
    
    return result;
}