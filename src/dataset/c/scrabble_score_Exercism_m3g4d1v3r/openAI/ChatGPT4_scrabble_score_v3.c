#include "scrabble_score.h"

static const size_t letter_score_array[ALPHABET_SIZE] = {
    ['A' - 'A'] = 1, ['E' - 'A'] = 1, ['I' - 'A'] = 1, ['O' - 'A'] = 1, ['U' - 'A'] = 1,
    ['L' - 'A'] = 1, ['N' - 'A'] = 1, ['R' - 'A'] = 1, ['S' - 'A'] = 1, ['T' - 'A'] = 1,
    ['D' - 'A'] = 2, ['G' - 'A'] = 2,
    ['B' - 'A'] = 3, ['C' - 'A'] = 3, ['M' - 'A'] = 3, ['P' - 'A'] = 3,
    ['F' - 'A'] = 4, ['H' - 'A'] = 4, ['V' - 'A'] = 4, ['W' - 'A'] = 4, ['Y' - 'A'] = 4,
    ['K' - 'A'] = 5,
    ['J' - 'A'] = 8, ['X' - 'A'] = 8,
    ['Q' - 'A'] = 10, ['Z' - 'A'] = 10
};

unsigned int score(const char *word) {
    unsigned int total_score = 0;
    while (*word != '\0') {
        char c = *word++;
        if (c >= 'a' && c <= 'z') {
            total_score += letter_score_array[c - 'a'];
        } else if (c >= 'A' && c <= 'Z') {
            total_score += letter_score_array[c - 'A'];
        }
    }
    return total_score;
}