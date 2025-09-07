#include "scrabble_score.h"
#include <array>
#include <cctype>

namespace scrabble_score
{
    int score(const std::string& word)
    {
        static constexpr std::array<int, 26> values = {
            1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
        };

        int sum = 0;
        for (char c : word)
        {
            if (std::isalpha(c))
                sum += values[std::toupper(c) - 'A'];
        }

        return sum;
    }
}