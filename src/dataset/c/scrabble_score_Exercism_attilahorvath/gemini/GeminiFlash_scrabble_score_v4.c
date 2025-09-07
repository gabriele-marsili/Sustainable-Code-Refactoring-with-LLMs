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
        int point;

        switch (c) {
            case 'A': case 'E': case 'I': case 'O': case 'U':
            case 'L': case 'N': case 'R': case 'S': case 'T':
                point = 1;
                break;
            case 'D': case 'G':
                point = 2;
                break;
            case 'B': case 'C': case 'M': case 'P':
                point = 3;
                break;
            case 'F': case 'H': case 'V': case 'W': case 'Y':
                point = 4;
                break;
            case 'K':
                point = 5;
                break;
            case 'J': case 'X':
                point = 8;
                break;
            case 'Q': case 'Z':
                point = 10;
                break;
            default:
                point = 0;
                break;
        }
        total_score += point;
    }

    return total_score;
}