#include "secret_handshake.h"

#include <stdio.h>
const char *actions[] = {"wink", "double blink", "close your eyes", "jump"};

const char **commands(size_t number) {
    const char **result;
    size_t chosen_words[4];
    size_t result_len, actions_len, word_idx;
    bool reverse;

    result_len = 0;
    actions_len = ARRAY_LEN(actions);
    reverse = ((number >> actions_len) & 1);
    word_idx = 0;
    for (size_t shift = 0; shift < actions_len; shift++) {
        if ((number >> shift) & 1) {
            chosen_words[word_idx++] = shift;
            result_len++;
        }
    }
    if (result_len == 0) {
        result = malloc(sizeof(const char *) * 1);
        *result = NULL;
        return (result);
    }
    result = malloc(sizeof(const char *) * result_len);
    if (result == NULL) return (NULL);
    for (size_t idx = 0; idx < word_idx; idx++) {
        size_t target_idx;

        target_idx = (reverse) ? result_len - idx - 1 : idx;
        *(result + idx) = actions[chosen_words[target_idx]];
    }
    return (result);
}
