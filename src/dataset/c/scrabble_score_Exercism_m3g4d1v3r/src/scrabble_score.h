#ifndef SCRABBLE_SCORE_H
#define SCRABBLE_SCORE_H

#define ALPHABET_SIZE 'z' - 'a' + 1
#include <stddef.h>

void write_to_letter_score_array();
unsigned int score(const char *word);

#endif
