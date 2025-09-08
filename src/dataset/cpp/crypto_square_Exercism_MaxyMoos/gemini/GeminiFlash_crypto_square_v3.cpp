#include "crypto_square.h"
#include <algorithm>
#include <iostream>
#include <boost/algorithm/string.hpp>
#include <cmath>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input) : _refStr(boost::algorithm::to_lower_copy(input)), squareSize(-1) {}

    int cipher::size()
    {
        if (this->squareSize == -1)
        {
            string normPlain = this->normalize_plain_text();
            this->squareSize = static_cast<int>(ceil(sqrt(normPlain.length())));
        }
        return this->squareSize;
    }

    string cipher::cipher_text()
    {
        string normPlain = this->normalize_plain_text();
        int sizeVal = this->size();
        string result;

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
        string cipherText = this->cipher_text();
        int sizeVal = this->size();
        string result;
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
        string normPlain = this->normalize_plain_text();
        int sizeVal = this->size();
        vector<string> result;

        for (size_t i = 0; i < normPlain.length(); i += sizeVal)
        {
            result.push_back(normPlain.substr(i, sizeVal));
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        result.reserve(_refStr.length());
        for (char c : this->_refStr)
        {
            if (isalnum(c))
            {
                result += c;
            }
        }
        return result;
    }

    bool cipher::char_is_not_alpha(char c)
    {
        return !isalnum(c);
    }
}