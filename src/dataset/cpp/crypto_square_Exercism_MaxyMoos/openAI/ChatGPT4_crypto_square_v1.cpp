#include "crypto_square.h"
#include <algorithm>
#include <boost/algorithm/string.hpp>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input)
    {
        boost::algorithm::to_lower(input);
        this->_refStr = move(input);
    }

    int cipher::size()
    {
        if (this->squareSize == -1)
        {
            int len = this->normalize_plain_text().length();
            this->squareSize = static_cast<int>(ceil(sqrt(len)));
        }
        return this->squareSize;
    }

    string cipher::cipher_text()
    {
        string result;
        const auto& plainSeg = this->plain_text_segments();
        int squareSize = this->size();
        result.reserve(squareSize * squareSize);

        for (int i = 0; i < squareSize; i++)
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
        string cipher = this->cipher_text();
        int squareSize = this->size();
        int len = cipher.length();
        string result;
        result.reserve(len + len / squareSize);

        for (int i = 0; i < len; i++)
        {
            result += cipher[i];
            if ((i + 1) % squareSize == 0 && i + 1 != len)
                result += ' ';
        }
        return result;
    }

    vector<string> cipher::plain_text_segments()
    {
        string normPlain = this->normalize_plain_text();
        int squareSize = this->size();
        int len = normPlain.length();
        vector<string> result((len + squareSize - 1) / squareSize);

        for (int i = 0; i < len; i++)
        {
            result[i / squareSize] += normPlain[i];
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        result.reserve(this->_refStr.length());
        for (char c : this->_refStr)
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