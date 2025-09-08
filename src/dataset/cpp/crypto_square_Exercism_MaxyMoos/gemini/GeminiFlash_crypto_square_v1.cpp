#include "crypto_square.h"
#include <algorithm>
#include <iostream>
#include <cctype>
#include <cmath>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input) : _refStr(input)
    {
        transform(_refStr.begin(), _refStr.end(), _refStr.begin(), ::tolower);
        squareSize = -1;
    }

    int cipher::size()
    {
        if (squareSize == -1)
        {
            string normPlain = normalize_plain_text();
            squareSize = (int)ceil(sqrt(normPlain.length()));
        }
        return squareSize;
    }

    string cipher::cipher_text()
    {
        string normPlain = normalize_plain_text();
        int sizeVal = size();
        string result;
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

    string cipher::normalized_cipher_text()
    {
        string cipherText = cipher_text();
        int sizeVal = size();
        string result;
        result.reserve(cipherText.length() + (cipherText.length() / sizeVal));

        for (size_t i = 0; i < cipherText.length(); ++i)
        {
            result += cipherText[i];
            if ((i + 1) % sizeVal == 0 && i + 1 != cipherText.length())
            {
                result += " ";
            }
        }
        return result;
    }

    vector<string> cipher::plain_text_segments()
    {
        string normPlain = normalize_plain_text();
        int sizeVal = size();
        vector<string> result;
        size_t numSegments = (normPlain.length() + sizeVal - 1) / sizeVal;
        result.reserve(numSegments);

        for (size_t i = 0; i < normPlain.length(); i += sizeVal)
        {
            result.emplace_back(normPlain.substr(i, sizeVal));
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        result.reserve(_refStr.length());
        for (char c : _refStr)
        {
            if (isalnum(c))
            {
                result += c;
            }
        }
        return result;
    }
}