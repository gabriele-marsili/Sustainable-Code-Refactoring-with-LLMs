#include "scrabble_score.h"

static const int letter_scores[26] = {
    1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
    1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
};

int score(const char *word) {
    int total_score = 0;
    const char *ptr = word;
    
    while (*ptr) {
        char c = *ptr;
        if (c >= 'A' && c <= 'Z') {
            total_score += letter_scores[c - 'A'];
        } else if (c >= 'a' && c <= 'z') {
            total_score += letter_scores[c - 'a'];
        }
        ptr++;
    }
    
    return total_score;
}