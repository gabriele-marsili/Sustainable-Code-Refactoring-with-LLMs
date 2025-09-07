#include "scrabble_score.h"
#include <algorithm>
#include <cctype>

using namespace std;

int scrabble_score::score(string input)
{
    int score = 0;
    for (char c : input) {
        score += scrabble_score::scoreTable[toupper(c)];
    }
    return score;
}