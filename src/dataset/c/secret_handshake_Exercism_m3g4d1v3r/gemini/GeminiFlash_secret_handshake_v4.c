#include "secret_handshake.h"

#include <stdlib.h>

const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};
const size_t actions_len = 4;

const char **commands(size_t number) {
    size_t result_len = 0;
    bool reverse = (number >> actions_len) & 1;

    // Calculate the number of actions to include
    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            result_len++;
        }
    }

    if (result_len == 0) {
        const char **result = malloc(sizeof(const char *));
        if (result != NULL) {
            *result = NULL;
        }
        return result;
    }

    const char **result = malloc(sizeof(const char *) * (result_len + 1)); // Allocate space for NULL terminator
    if (result == NULL) {
        return NULL;
    }

    size_t result_idx = 0;
    if (reverse) {
        for (size_t shift = actions_len; shift-- > 0;) {
            if ((number >> shift) & 1) {
                result[result_idx++] = actions[shift];
            }
        }
    } else {
        for (size_t shift = 0; shift < actions_len; shift++) {
            if ((number >> shift) & 1) {
                result[result_idx++] = actions[shift];
            }
        }
    }

    result[result_len] = NULL; // Null-terminate the array
    return result;
}