#include "scrabble_score.h"
#include <cctype>

using namespace std;

namespace scrabble_score
{
    int score(string word)
    {
        static const int values[26] = {
            1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
            1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
        };
        
        int sum = 0;
        for (char c : word)
        {
            sum += values[toupper(c) - 'A'];
        }
        
        return sum;
    }
}