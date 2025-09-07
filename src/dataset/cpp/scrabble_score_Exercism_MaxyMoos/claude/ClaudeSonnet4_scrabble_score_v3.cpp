#include "scrabble_score.h"
#include <cctype>

using namespace std;

int scrabble_score::score(string input)
{
    int score = 0;
    
    for (char c : input) {
        char upperChar = (c >= 'a' && c <= 'z') ? c - 32 : c;
        score += scrabble_score::scoreTable[upperChar];
    }

    return score;
}