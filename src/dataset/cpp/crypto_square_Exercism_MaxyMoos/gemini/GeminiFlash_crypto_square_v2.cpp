#include "crypto_square.h"
#include <algorithm>
#include <iostream>
#include <cctype>
#include <cmath>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input) : _refStr(input) {}

    int cipher::size()
    {
        if (this->squareSize == -1)
        {
            string normPlain = this->normalize_plain_text();
            this->squareSize = (int)ceil(sqrt(normPlain.length()));
        }
        return this->squareSize;
    }

    string cipher::cipher_text()
    {
        string normPlain = this->normalize_plain_text();
        int square_size = this->size();
        string result;

        for (int col = 0; col < square_size; ++col)
        {
            for (size_t row = 0; row < normPlain.length(); row += square_size)
            {
                if (row + col < normPlain.length())
                {
                    result += normPlain[row + col];
                }
            }
        }
        return result;
    }

    string cipher::normalized_cipher_text()
    {
        string cipher_text_val = this->cipher_text();
        string result;
        for (size_t i = 0; i < cipher_text_val.length(); ++i)
        {
            result += cipher_text_val[i];
            if ((i + 1) % this->size() == 0 && i + 1 != cipher_text_val.length())
            {
                result += " ";
            }
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
                result += tolower(c);
            }
        }
        return result;
    }
}