#include "phone_number.h"

static inline bool check_n_digit(char input) {
    return (input >= '2' && input <= '9');
}

static inline bool is_digit(char input) {
    return (input >= '0' && input <= '9');
}

char *phone_number_clean(const char *input) {
    char *result = malloc(sizeof(char) * (MAX_NBS + 1));
    if (!result) return NULL;
    
    size_t nb_counter = 0;
    const char *ptr = input;
    char *write_ptr = result;
    
    // Skip leading '1' if present
    while (*ptr && !is_digit(*ptr)) ptr++;
    if (*ptr == '1') {
        ptr++;
        while (*ptr && !is_digit(*ptr)) ptr++;
    }
    
    // Extract digits
    while (*ptr && nb_counter < MAX_NBS) {
        if (!is_digit(*ptr)) {
            ptr++;
            continue;
        }
        
        // Check first digit of area code and exchange code
        if ((nb_counter == 0 || nb_counter == 3) && !check_n_digit(*ptr)) {
            memset(result, '0', MAX_NBS);
            result[MAX_NBS] = '\0';
            return result;
        }
        
        *write_ptr++ = *ptr++;
        nb_counter++;
    }
    
    // Check if we have exactly MAX_NBS digits
    if (nb_counter != MAX_NBS) {
        memset(result, '0', MAX_NBS);
        result[MAX_NBS] = '\0';
        return result;
    }
    
    *write_ptr = '\0';
    return result;
}