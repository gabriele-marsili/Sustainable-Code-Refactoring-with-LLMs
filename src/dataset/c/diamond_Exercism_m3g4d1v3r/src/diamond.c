#include "diamond.h"

/*
 * input: 'A'
 * n: 1
 * A
 *
 * input: 'B'
 * n: 3
 * #A#
 * B#B
 * #A#
 *
 * input: 'C'
 * n: 5
 * ##A## idx: 2
 * #B#B# idx: 1, 3
 * C###C idx: 0, 4
 * #B#B# idx: 1, 3
 * ##A##
 *
 * input: 'D'
 * n: 7
 * ###A### idx: 3
 * ##B#B## idx: 2, 4
 * #C###C# idx: 1, 5
 * D#####D idx: 0, 6
 */
char **make_diamond(const char letter) {
    char **output;
    size_t diamond_len;
    bool reverse;
    size_t letter_i, letter_j;

    if (!(letter >= 'A' && letter <= 'Z')) return (NULL);
    diamond_len = 2 * (letter - 'A') + 1;
    output = malloc(sizeof(char *) * (diamond_len + 1));
    if (output == NULL) return (NULL);
    for (size_t idx = 0; idx < diamond_len; idx++) {
        *(output + idx) = malloc(sizeof(char) * (diamond_len + 1));
        if (output[idx] == NULL) {
            for (size_t inner_idx = 0; inner_idx < idx; inner_idx++)
                free(output[inner_idx]);
            return (NULL);
        }
        reverse = (idx >= ceil(diamond_len / 2.0)) ? true : false;
        if (reverse == false) {
            letter_i = floor(diamond_len / 2.0) - idx;
            letter_j = floor(diamond_len / 2.0) + idx;
        } else {
            letter_i = idx - ceil(diamond_len / 2.0) + 1;
            letter_j = diamond_len - 1 - (idx - ceil(diamond_len / 2.0)) - 1;
        }
        for (size_t col = 0; col <= diamond_len; col++) {
            if (col == diamond_len) {
                output[idx][col] = '\0';
            } else if (col == letter_i || col == letter_j) {
                if (reverse == false)
                    output[idx][col] = 'A' + idx;
                else
                    output[idx][col] = letter - letter_i;
            } else {
                output[idx][col] = ' ';
            }
        }
    }
    output[diamond_len] = NULL;
    return (output);
}

void free_diamond(char **diamond) {
    size_t idx;

    if (diamond == NULL) return;
    idx = 0;
    while (diamond[idx] != NULL) {
        free(diamond[idx]);
        idx++;
    }
    free(diamond);
}
