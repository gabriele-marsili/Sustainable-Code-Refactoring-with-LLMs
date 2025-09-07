#include "scrabble_score.h"
#include <ctype.h>

static size_t letter_score_array[ALPHABET_SIZE] = {0};
static bool initialized = false;

void write_to_letter_score_array() {
    letter_score_array[0] = 1;   // A
    letter_score_array[4] = 1;   // E
    letter_score_array[8] = 1;   // I
    letter_score_array[14] = 1;  // O
    letter_score_array[20] = 1;  // U
    letter_score_array[11] = 1;  // L
    letter_score_array[13] = 1;  // N
    letter_score_array[17] = 1;  // R
    letter_score_array[18] = 1;  // S
    letter_score_array[19] = 1;  // T
    letter_score_array[3] = 2;   // D
    letter_score_array[6] = 2;   // G
    letter_score_array[1] = 3;   // B
    letter_score_array[2] = 3;   // C
    letter_score_array[12] = 3;  // M
    letter_score_array[15] = 3;  // P
    letter_score_array[5] = 4;   // F
    letter_score_array[7] = 4;   // H
    letter_score_array[21] = 4;  // V
    letter_score_array[22] = 4;  // W
    letter_score_array[24] = 4;  // Y
    letter_score_array[10] = 5;  // K
    letter_score_array[9] = 8;   // J
    letter_score_array[23] = 8;  // X
    letter_score_array[16] = 10;  // Q
    letter_score_array[25] = 10;  // Z
}

unsigned int score(const char *word) {
    unsigned int total_score = 0;

    if (!initialized) {
        write_to_letter_score_array();
        initialized = true;
    }

    while (word && *word != '\0') {
        unsigned char c = (unsigned char)*word;
        if (isalpha(c)) {
            c = toupper(c);
            total_score += letter_score_array[c - 'A'];
        }
        word++;
    }
    return total_score;
}