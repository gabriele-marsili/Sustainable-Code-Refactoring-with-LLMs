#include "scrabble_score.h"
#include <ctype.h>
#include <string.h>

int score(const char *word) {
    int total_score = 0;
    if (word == NULL) {
        return 0;
    }

    for (size_t i = 0; i < strlen(word); ++i) {
        char c = toupper(word[i]);
        int char_score = 0;

        switch (c) {
            case 'A': case 'E': case 'I': case 'O': case 'U':
            case 'L': case 'N': case 'R': case 'S': case 'T':
                char_score = 1;
                break;
            case 'D': case 'G':
                char_score = 2;
                break;
            case 'B': case 'C': case 'M': case 'P':
                char_score = 3;
                break;
            case 'F': case 'H': case 'V': case 'W': case 'Y':
                char_score = 4;
                break;
            case 'K':
                char_score = 5;
                break;
            case 'J': case 'X':
                char_score = 8;
                break;
            case 'Q': case 'Z':
                char_score = 10;
                break;
            default:
                char_score = 0; 
                break;
        }
        total_score += char_score;
    }

    return total_score;
}