#include "secret_handshake.h"

#include <stdlib.h>
#include <string.h>

const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};
const size_t actions_len = sizeof(actions) / sizeof(actions[0]);

const char **commands(size_t number) {
    size_t result_len = 0;
    bool reverse = (number >> actions_len) & 1;

    // Calculate the number of actions to include
    for (size_t i = 0; i < actions_len; ++i) {
        if ((number >> i) & 1) {
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

    const char **result = malloc(sizeof(const char *) * (result_len + 1)); // +1 for NULL terminator
    if (result == NULL) {
        return NULL;
    }

    size_t result_idx = 0;
    if (reverse) {
        for (size_t i = actions_len; i-- > 0;) {
            if ((number >> i) & 1) {
                result[result_idx++] = actions[i];
            }
        }
    } else {
        for (size_t i = 0; i < actions_len; ++i) {
            if ((number >> i) & 1) {
                result[result_idx++] = actions[i];
            }
        }
    }
    result[result_idx] = NULL; // Null-terminate the array

    return result;
}