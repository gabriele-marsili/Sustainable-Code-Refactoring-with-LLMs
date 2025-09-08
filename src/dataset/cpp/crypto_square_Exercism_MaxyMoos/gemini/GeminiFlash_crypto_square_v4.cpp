#include "crypto_square.h"
#include <algorithm>
#include <cmath>
#include <cctype>

namespace crypto_square
{
    cipher::cipher(std::string input) : _refStr(input), squareSize(-1)
    {
        std::transform(_refStr.begin(), _refStr.end(), _refStr.begin(), ::tolower);
    }

    int cipher::size()
    {
        if (squareSize == -1)
        {
            std::string normPlain = normalize_plain_text();
            squareSize = static_cast<int>(std::ceil(std::sqrt(normPlain.length())));
        }
        return squareSize;
    }

    std::string cipher::cipher_text()
    {
        std::string normPlain = normalize_plain_text();
        int sizeVal = size();
        std::string result;
        result.reserve(normPlain.length());

        for (int i = 0; i < sizeVal; ++i)
        {
            for (size_t j = 0; j < normPlain.length(); j += sizeVal)
            {
                if (i + j < normPlain.length())
                {
                    result += normPlain[i + j];
                }
            }
        }
        return result;
    }

    std::string cipher::normalized_cipher_text()
    {
        std::string cipherText = cipher_text();
        int sizeVal = size();
        std::string result;
        result.reserve(cipherText.length() + (cipherText.length() / sizeVal));

        for (size_t i = 0; i < cipherText.length(); ++i)
        {
            result += cipherText[i];
            if ((i + 1) % sizeVal == 0 && i + 1 != cipherText.length())
            {
                result += ' ';
            }
        }
        return result;
    }

    std::vector<std::string> cipher::plain_text_segments()
    {
        std::string normPlain = normalize_plain_text();
        int sizeVal = size();
        std::vector<std::string> result;
        size_t numSegments = (normPlain.length() + sizeVal - 1) / sizeVal;
        result.reserve(numSegments);

        for (size_t i = 0; i < normPlain.length(); i += sizeVal)
        {
            result.emplace_back(normPlain.substr(i, sizeVal));
        }
        return result;
    }

    std::string cipher::normalize_plain_text() const
    {
        std::string result;
        result.reserve(_refStr.length());
        for (char c : _refStr)
        {
            if (std::isalnum(c))
            {
                result += c;
            }
        }
        return result;
    }
}