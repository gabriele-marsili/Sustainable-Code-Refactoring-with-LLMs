#include "secret_handshake.h"

#include <stdlib.h>
#include <string.h>

const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};

const char **commands(size_t number) {
    size_t result_len = 0;
    size_t actions_len = sizeof(actions) / sizeof(actions[0]);
    bool reverse = (number >> actions_len) & 1;
    size_t chosen_words[4];
    size_t word_idx = 0;

    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            chosen_words[word_idx++] = shift;
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

    const char **result = malloc(sizeof(const char *) * (result_len + 1));
    if (result == NULL) {
        return NULL;
    }

    if (reverse) {
        for (size_t idx = 0; idx < result_len; idx++) {
            result[idx] = actions[chosen_words[result_len - 1 - idx]];
        }
    } else {
        for (size_t idx = 0; idx < result_len; idx++) {
            result[idx] = actions[chosen_words[idx]];
        }
    }

    result[result_len] = NULL;
    return result;
}