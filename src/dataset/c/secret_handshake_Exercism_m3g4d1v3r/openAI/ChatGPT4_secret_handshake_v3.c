#include "secret_handshake.h"

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};

const char **commands(size_t number) {
    size_t actions_len = sizeof(actions) / sizeof(actions[0]);
    bool reverse = (number >> actions_len) & 1;
    size_t result_len = 0;

    // Precompute result length
    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            result_len++;
        }
    }

    const char **result = malloc(sizeof(const char *) * (result_len + 1));
    if (!result) return NULL;

    size_t idx = 0;
    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            size_t target_idx = reverse ? result_len - idx - 1 : idx;
            result[target_idx] = actions[shift];
            idx++;
        }
    }

    result[result_len] = NULL; // Null-terminate the result array
    return result;
}