#include "scrabble_score.h"
#include <algorithm>
#include <string>
#include <unordered_map>

using namespace std;

int scrabble_score::score(string input) {
  int score_value = 0;
  for (char c : input) {
    char upper_c = toupper(c);
    score_value += scrabble_score::scoreTable[upper_c];
  }
  return score_value;
}