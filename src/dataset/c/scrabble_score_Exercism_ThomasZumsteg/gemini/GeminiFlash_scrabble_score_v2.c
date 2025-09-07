#include "scrabble_score.h"
#include <ctype.h>

int score(char *word) {
    int total = 0;
    if (word == NULL) return 0;

    for (char *c = word; *c; c++) {
        char upper_c = toupper(*c);
        int val;

        switch (upper_c) {
            case 'A': case 'E': case 'I': case 'O': case 'U': case 'L': case 'N': case 'R': case 'S': case 'T':
                val = 1;
                break;
            case 'D': case 'G':
                val = 2;
                break;
            case 'B': case 'C': case 'M': case 'P':
                val = 3;
                break;
            case 'F': case 'H': case 'V': case 'W': case 'Y':
                val = 4;
                break;
            case 'K':
                val = 5;
                break;
            case 'J': case 'X':
                val = 8;
                break;
            case 'Q': case 'Z':
                val = 10;
                break;
            default:
                val = 0;
                break;
        }
        total += val;
    }
    return total;
}