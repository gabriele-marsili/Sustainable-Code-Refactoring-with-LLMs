#include "scrabble_score.h"
#include <cctype>

using namespace std;

int scrabble_score::score(const string& input)
{
    int score = 0;

    for (char ch : input)
        score += scrabble_score::scoreTable[std::toupper(static_cast<unsigned char>(ch))];

    return score;
}