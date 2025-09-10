#include "phone_number.h"

#include <ctype.h>

char *phone_number_clean(const char *input) {
    char *result = malloc(sizeof(char) * (MAX_NBS + 1));
    if (result == NULL) return NULL;

    char *result_ptr = result;
    size_t digit_count = 0;

    while (*input != '\0') {
        if (isdigit((unsigned char)*input)) {
            if (digit_count == 0 && *input == '1') {
                input++;
                continue;
            }

            if ((digit_count == 0 || digit_count == 3) && (*input < '2' || *input > '9')) {
                memset(result, '0', MAX_NBS);
                result[MAX_NBS] = '\0';
                return result;
            }

            if (digit_count < MAX_NBS) {
                *result_ptr++ = *input;
                digit_count++;
            } else {
                memset(result, '0', MAX_NBS);
                result[MAX_NBS] = '\0';
                return result;
            }
        }
        input++;
    }

    if (digit_count != MAX_NBS) {
        memset(result, '0', MAX_NBS);
        result[MAX_NBS] = '\0';
    } else {
        *result_ptr = '\0';
    }

    return result;
}