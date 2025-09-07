#include "scrabble_score.h"

static const size_t letter_score_array[ALPHABET_SIZE] = {
    ['A' - 'A'] = 1, ['B' - 'A'] = 3, ['C' - 'A'] = 3, ['D' - 'A'] = 2,
    ['E' - 'A'] = 1, ['F' - 'A'] = 4, ['G' - 'A'] = 2, ['H' - 'A'] = 4,
    ['I' - 'A'] = 1, ['J' - 'A'] = 8, ['K' - 'A'] = 5, ['L' - 'A'] = 1,
    ['M' - 'A'] = 3, ['N' - 'A'] = 1, ['O' - 'A'] = 1, ['P' - 'A'] = 3,
    ['Q' - 'A'] = 10, ['R' - 'A'] = 1, ['S' - 'A'] = 1, ['T' - 'A'] = 1,
    ['U' - 'A'] = 1, ['V' - 'A'] = 4, ['W' - 'A'] = 4, ['X' - 'A'] = 8,
    ['Y' - 'A'] = 4, ['Z' - 'A'] = 10
};

unsigned int score(const char *word) {
    unsigned int total_score = 0;

    while (*word != '\0') {
        char c = *word;
        if (c >= 'a' && c <= 'z') {
            total_score += letter_score_array[c - 'a'];
        } else if (c >= 'A' && c <= 'Z') {
            total_score += letter_score_array[c - 'A'];
        }
        word++;
    }
    return total_score;
}