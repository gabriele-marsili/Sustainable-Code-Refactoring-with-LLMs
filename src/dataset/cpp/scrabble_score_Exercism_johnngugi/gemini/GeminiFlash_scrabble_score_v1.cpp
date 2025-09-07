#include "scrabble_score.h"
#include <cctype>
#include <string>

using namespace std;

namespace scrabble_score {

int score(string word) {
  int sum = 0;
  // Use a static lookup table for efficiency.  This avoids re-creating the
  // map on every function call. Using an array is even faster than a map.
  static const int letter_scores[26] = {
      1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8,
      4, 10};

  // Iterate through the word and calculate the score.
  for (char c : word) {
    // Convert the character to uppercase and get its score.
    char upper_c = toupper(c);
    if (upper_c >= 'A' && upper_c <= 'Z') {
      sum += letter_scores[upper_c - 'A'];
    }
    // else consider other characters to have a score of 0, or handle them as an error
    // depending on the requirements.
  }

  return sum;
}
} // namespace scrabble_score