#include "scrabble_score.h"
#include <cctype>

using namespace std;

int scrabble_score::score(string input)
{
    int score = 0;

    for (char ch : input)
        score += scrabble_score::scoreTable[toupper(ch)];

    return score;
}