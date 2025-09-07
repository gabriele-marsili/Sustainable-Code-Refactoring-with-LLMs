#include "scrabble_score.h"

static const size_t letter_score_array[ALPHABET_SIZE] = {
    1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
    1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
};

unsigned int score(const char *word) {
    unsigned int total_score = 0;
    
    while (*word != '\0') {
        if (*word >= 'a' && *word <= 'z') {
            total_score += letter_score_array[*word - 'a'];
        } else if (*word >= 'A' && *word <= 'Z') {
            total_score += letter_score_array[*word - 'A'];
        }
        word++;
    }
    return total_score;
}