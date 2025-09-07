#include "scrabble_score.h"
#include <ctype.h>
#include <string.h>

int score(const char *word) {
    int total_score = 0;
    if (word == NULL) {
        return 0;
    }

    size_t len = strlen(word);
    for (size_t i = 0; i < len; ++i) {
        char c = toupper(word[i]);
        int letter_score = 0;

        switch (c) {
            case 'A': case 'E': case 'I': case 'O': case 'U':
            case 'L': case 'N': case 'R': case 'S': case 'T':
                letter_score = 1;
                break;
            case 'D': case 'G':
                letter_score = 2;
                break;
            case 'B': case 'C': case 'M': case 'P':
                letter_score = 3;
                break;
            case 'F': case 'H': case 'V': case 'W': case 'Y':
                letter_score = 4;
                break;
            case 'K':
                letter_score = 5;
                break;
            case 'J': case 'X':
                letter_score = 8;
                break;
            case 'Q': case 'Z':
                letter_score = 10;
                break;
            default:
                letter_score = 0;
                break;
        }
        total_score += letter_score;
    }

    return total_score;
}