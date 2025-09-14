#include "secret_handshake.h"

#include <stdio.h>
const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};

const char **commands(size_t number) {
    const char **result;
    size_t result_len = 0;
    const size_t actions_len = ARRAY_LEN(actions);
    const bool reverse = ((number >> actions_len) & 1);
    
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
    if (reverse) {
        for (size_t shift = actions_len; shift > 0; shift--) {
            if ((number >> (shift - 1)) & 1) {
                result[idx++] = actions[shift - 1];
            }
        }
    } else {
        for (size_t shift = 0; shift < actions_len; shift++) {
            if ((number >> shift) & 1) {
                result[idx++] = actions[shift];
            }
        }
    }
    
    return result;
}