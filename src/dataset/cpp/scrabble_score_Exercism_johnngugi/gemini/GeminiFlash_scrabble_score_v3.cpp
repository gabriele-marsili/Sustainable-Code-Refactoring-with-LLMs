#include "scrabble_score.h"
#include <string>
#include <cctype>

using namespace std;

namespace scrabble_score
{
    int score(string word)
    {
        int sum = 0;
        static const int values[26] = {
            1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

        for (char c : word)
        {
            char upper_c = toupper(c);
            if (upper_c >= 'A' && upper_c <= 'Z')
            {
                sum += values[upper_c - 'A'];
            }
        }

        return sum;
    }
}