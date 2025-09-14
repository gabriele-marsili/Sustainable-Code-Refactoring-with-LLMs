#include "secret_handshake.h"

#include <stdio.h>
const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};

const char **commands(size_t number) {
    const char **result;
    size_t result_len = 0;
    const size_t actions_len = 4;
    const bool reverse = (number >> actions_len) & 1;
    
    // Count set bits in one pass
    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            result_len++;
        }
    }
    
    if (result_len == 0) {
        result = malloc(sizeof(const char *));
        *result = NULL;
        return result;
    }
    
    result = malloc(sizeof(const char *) * result_len);
    if (result == NULL) return NULL;
    
    size_t idx = 0;
    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            size_t target_idx = reverse ? result_len - idx - 1 : idx;
            result[target_idx] = actions[shift];
            idx++;
        }
    }
    
    return result;
}