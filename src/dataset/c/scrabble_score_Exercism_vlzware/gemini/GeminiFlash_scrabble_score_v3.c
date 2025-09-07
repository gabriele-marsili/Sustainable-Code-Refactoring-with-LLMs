#include "scrabble_score.h"
#include <ctype.h>
#include <stddef.h>

int score(const char *input) {
  if (input == NULL || *input == '\0') {
    return 0;
  }

  static const int scrabble_scores[26] = {
      1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
      1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

  int total_score = 0;
  for (const char *p = input; *p != '\0'; ++p) {
    unsigned char c = (unsigned char)toupper(*p);
    if (c >= 'A' && c <= 'Z') {
      total_score += scrabble_scores[c - 'A'];
    }
  }

  return total_score;
}