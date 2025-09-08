#include "crypto_square.h"
#include <algorithm>
#include <boost/algorithm/string.hpp>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input)
        : _refStr(boost::algorithm::to_lower_copy(input)), squareSize(-1) {}

    int cipher::size()
    {
        if (squareSize == -1)
        {
            int len = normalize_plain_text().length();
            squareSize = static_cast<int>(ceil(sqrt(len)));
        }
        return squareSize;
    }

    string cipher::cipher_text()
    {
        string result;
        vector<string> plainSeg = plain_text_segments();
        int segSize = size();
        result.reserve(segSize * segSize); // Reserve memory to avoid reallocations

        for (int i = 0; i < segSize; i++)
        {
            for (const auto& segment : plainSeg)
            {
                if (i < segment.length())
                    result += segment[i];
            }
        }
        return result;
    }

    string cipher::normalized_cipher_text()
    {
        string cipher = cipher_text();
        int segSize = size();
        int len = cipher.length();
        string result;
        result.reserve(len + len / segSize); // Reserve memory for spaces

        for (int i = 0; i < len; i++)
        {
            result += cipher[i];
            if ((i + 1) % segSize == 0 && i + 1 != len)
                result += ' ';
        }
        return result;
    }

    vector<string> cipher::plain_text_segments()
    {
        string normPlain = normalize_plain_text();
        int segSize = size();
        int len = normPlain.length();
        vector<string> result((len + segSize - 1) / segSize); // Preallocate vector

        for (int i = 0; i < len; i++)
        {
            result[i / segSize] += normPlain[i];
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        result.reserve(_refStr.length()); // Reserve memory to avoid reallocations

        for (char c : _refStr)
        {
            if (!char_is_not_alpha(c))
                result += c;
        }
        return result;
    }

    bool cipher::char_is_not_alpha(char c)
    {
        return !isalnum(c);
    }
}