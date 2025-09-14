#include "secret_handshake.h"

#include <stdio.h>
const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};

const char **commands(size_t number) {
    const char **result;
    size_t result_len = 0;
    bool reverse = (number & 16);
    
    // Count set bits in first 4 positions
    for (size_t i = 0; i < 4; i++) {
        if (number & (1 << i)) {
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
        for (int i = 3; i >= 0; i--) {
            if (number & (1 << i)) {
                result[idx++] = actions[i];
            }
        }
    } else {
        for (size_t i = 0; i < 4; i++) {
            if (number & (1 << i)) {
                result[idx++] = actions[i];
            }
        }
    }
    
    return result;
}