#include "scrabble_score.h"

static const size_t letter_score_array[ALPHABET_SIZE] = {
    1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
};

void write_to_letter_score_array() {
    // Function kept for interface compatibility but no longer needed
}

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