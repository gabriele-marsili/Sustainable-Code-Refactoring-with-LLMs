#include "secret_handshake.h"

#include <stdlib.h>

const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};
#define ACTIONS_LEN 4

const char **commands(size_t number) {
    const char **result;
    size_t result_len = 0;
    size_t chosen_words[ACTIONS_LEN];
    size_t word_idx = 0;
    bool reverse = (number & 16) != 0; // Check the 5th bit for reverse

    for (size_t i = 0; i < ACTIONS_LEN; ++i) {
        if ((number & (1 << i)) != 0) {
            chosen_words[word_idx++] = i;
            result_len++;
        }
    }

    if (result_len == 0) {
        result = malloc(sizeof(const char *));
        if (result != NULL) {
            *result = NULL;
        }
        return result;
    }

    result = malloc(sizeof(const char *) * (result_len + 1)); // Allocate space for NULL terminator
    if (result == NULL) {
        return NULL;
    }

    if (reverse) {
        for (size_t i = 0; i < result_len; ++i) {
            result[i] = actions[chosen_words[result_len - 1 - i]];
        }
    } else {
        for (size_t i = 0; i < result_len; ++i) {
            result[i] = actions[chosen_words[i]];
        }
    }

    result[result_len] = NULL; // Null-terminate the array
    return result;
}