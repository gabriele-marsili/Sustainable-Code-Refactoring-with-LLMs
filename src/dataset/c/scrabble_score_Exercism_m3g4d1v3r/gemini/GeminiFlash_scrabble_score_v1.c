#include "scrabble_score.h"
#include <ctype.h>

static size_t letter_score_array[ALPHABET_SIZE] = {0};
static bool letter_score_array_initialized = false;

void write_to_letter_score_array() {
    if (letter_score_array_initialized) {
        return;
    }

    letter_score_array['A' - 'A'] = 1;
    letter_score_array['E' - 'A'] = 1;
    letter_score_array['I' - 'A'] = 1;
    letter_score_array['O' - 'A'] = 1;
    letter_score_array['U' - 'A'] = 1;
    letter_score_array['L' - 'A'] = 1;
    letter_score_array['N' - 'A'] = 1;
    letter_score_array['R' - 'A'] = 1;
    letter_score_array['S' - 'A'] = 1;
    letter_score_array['T' - 'A'] = 1;
    letter_score_array['D' - 'A'] = 2;
    letter_score_array['G' - 'A'] = 2;
    letter_score_array['B' - 'A'] = 3;
    letter_score_array['C' - 'A'] = 3;
    letter_score_array['M' - 'A'] = 3;
    letter_score_array['P' - 'A'] = 3;
    letter_score_array['F' - 'A'] = 4;
    letter_score_array['H' - 'A'] = 4;
    letter_score_array['V' - 'A'] = 4;
    letter_score_array['W' - 'A'] = 4;
    letter_score_array['Y' - 'A'] = 4;
    letter_score_array['K' - 'A'] = 5;
    letter_score_array['J' - 'A'] = 8;
    letter_score_array['X' - 'A'] = 8;
    letter_score_array['Q' - 'A'] = 10;
    letter_score_array['Z' - 'A'] = 10;

    letter_score_array_initialized = true;
}

unsigned int score(const char *word) {
    unsigned int total_score = 0;

    if (!letter_score_array_initialized) {
        write_to_letter_score_array();
    }

    while (*word != '\0') {
        char c = *word;
        if (isalpha(c)) {
            c = toupper(c);
            total_score += letter_score_array[c - 'A'];
        }
        word++;
    }
    return total_score;
}