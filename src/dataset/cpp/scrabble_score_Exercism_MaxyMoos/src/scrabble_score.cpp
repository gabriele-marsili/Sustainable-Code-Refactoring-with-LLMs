#include "scrabble_score.h"
#include <boost/algorithm/string.hpp>

using namespace std;

int scrabble_score::score(string input)
{
    string upperInput = boost::algorithm::to_upper_copy(input);
    int score = 0;
    
    for (string::iterator it = upperInput.begin(); it != upperInput.end(); it++)
        score += scrabble_score::scoreTable[*it];

    return score;
}