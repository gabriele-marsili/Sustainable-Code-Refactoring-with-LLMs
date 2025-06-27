#include "scrabble_score.h"

static size_t letter_score_array[ALPHABET_SIZE] = {0};

void write_to_letter_score_array() {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        switch (idx + 'A') {
            case 'A':
            case 'E':
            case 'I':
            case 'O':
            case 'U':
            case 'L':
            case 'N':
            case 'R':
            case 'S':
            case 'T':
                letter_score_array[idx] = 1;
                break;
            case 'D':
            case 'G':
                letter_score_array[idx] = 2;
                break;
            case 'B':
            case 'C':
            case 'M':
            case 'P':
                letter_score_array[idx] = 3;
                break;
            case 'F':
            case 'H':
            case 'V':
            case 'W':
            case 'Y':
                letter_score_array[idx] = 4;
                break;
            case 'K':
                letter_score_array[idx] = 5;
                break;
            case 'J':
            case 'X':
                letter_score_array[idx] = 8;
                break;
            case 'Q':
            case 'Z':
                letter_score_array[idx] = 10;
                break;
        }
    }
}

unsigned int score(const char *word) {
    unsigned int total_score = 0;

    if (letter_score_array[0] == 0) {
        write_to_letter_score_array();
    }
    while (*word != '\0') {
        if (*word >= 'a' && *word <= 'z') {
            total_score += letter_score_array[*word - 'a'];
        } else if (*word >= 'A' && *word <= 'Z') {
            total_score += letter_score_array[*word - 'A'];
        }
        word++;
    }
    return (total_score);
}
