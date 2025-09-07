#include "scrabble_score.h"
#include <algorithm>
#include <string>

using namespace std;

int scrabble_score::score(string input) {
  int score = 0;
  for (char c : input) {
    char upper_c = toupper(c);
    score += scrabble_score::scoreTable[upper_c];
  }
  return score;
}