#include "scrabble_score.h"
#include <cctype>

using namespace std;

int scrabble_score::score(string input)
{
    int score = 0;
    
    for (char c : input) {
        score += scrabble_score::scoreTable[std::toupper(c)];
    }

    return score;
}