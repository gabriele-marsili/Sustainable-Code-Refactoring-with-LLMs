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
        const auto& plainSeg = plain_text_segments();
        int segSize = size();
        for (int i = 0; i < segSize; ++i)
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
        string result;
        result.reserve(cipher.size() + cipher.size() / segSize); // Preallocate memory
        for (size_t i = 0; i < cipher.size(); ++i)
        {
            result += cipher[i];
            if ((i + 1) % segSize == 0 && i + 1 != cipher.size())
                result += ' ';
        }
        return result;
    }

    vector<string> cipher::plain_text_segments()
    {
        string normPlain = normalize_plain_text();
        int segSize = size();
        vector<string> result((normPlain.length() + segSize - 1) / segSize);
        for (size_t i = 0; i < normPlain.length(); ++i)
        {
            result[i / segSize] += normPlain[i];
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        result.reserve(_refStr.size()); // Preallocate memory
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