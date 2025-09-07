#include "scrabble_score.h"

static const unsigned char letter_scores[256] = {
    ['A'] = 1, ['B'] = 3, ['C'] = 3, ['D'] = 2, ['E'] = 1,
    ['F'] = 4, ['G'] = 2, ['H'] = 4, ['I'] = 1, ['J'] = 8,
    ['K'] = 5, ['L'] = 1, ['M'] = 3, ['N'] = 1, ['O'] = 1,
    ['P'] = 3, ['Q'] = 10, ['R'] = 1, ['S'] = 1, ['T'] = 1,
    ['U'] = 1, ['V'] = 4, ['W'] = 4, ['X'] = 8, ['Y'] = 4,
    ['Z'] = 10,
    ['a'] = 1, ['b'] = 3, ['c'] = 3, ['d'] = 2, ['e'] = 1,
    ['f'] = 4, ['g'] = 2, ['h'] = 4, ['i'] = 1, ['j'] = 8,
    ['k'] = 5, ['l'] = 1, ['m'] = 3, ['n'] = 1, ['o'] = 1,
    ['p'] = 3, ['q'] = 10, ['r'] = 1, ['s'] = 1, ['t'] = 1,
    ['u'] = 1, ['v'] = 4, ['w'] = 4, ['x'] = 8, ['y'] = 4,
    ['z'] = 10
};

int score(const char *word) {
    int total_score = 0;
    
    for (const char *p = word; *p; p++) {
        total_score += letter_scores[(unsigned char)*p];
    }
    
    return total_score;
}