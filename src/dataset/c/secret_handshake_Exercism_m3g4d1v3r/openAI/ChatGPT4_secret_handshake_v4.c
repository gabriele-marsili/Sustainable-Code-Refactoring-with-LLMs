#include "secret_handshake.h"

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};

const char **commands(size_t number) {
    size_t actions_len = sizeof(actions) / sizeof(actions[0]);
    bool reverse = (number >> actions_len) & 1;
    size_t result_len = 0;

    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            result_len++;
        }
    }

    if (result_len == 0) {
        const char **result = malloc(sizeof(const char *));
        if (result) *result = NULL;
        return result;
    }

    const char **result = malloc(sizeof(const char *) * result_len);
    if (!result) return NULL;

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