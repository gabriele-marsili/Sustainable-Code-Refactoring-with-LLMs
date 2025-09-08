#include "crypto_square.h"
#include <algorithm>
#include <cmath>
#include <cctype>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input) : _refStr(std::move(input)), squareSize(-1)
    {
        std::transform(_refStr.begin(), _refStr.end(), _refStr.begin(), ::tolower);
    }

    int cipher::size()
    {
        if (this->squareSize == -1)
        {
            string normPlain = this->normalize_plain_text();
            this->squareSize = static_cast<int>(std::ceil(std::sqrt(normPlain.length())));
        }
        return this->squareSize;
    }

    string cipher::cipher_text()
    {
        string normPlain = this->normalize_plain_text();
        int sz = this->size();
        string result;
        result.reserve(normPlain.length());
        
        for (int col = 0; col < sz; col++)
        {
            for (int row = 0; row < sz; row++)
            {
                int index = row * sz + col;
                if (index < normPlain.length())
                    result += normPlain[index];
            }
        }
        return result;
    }

    string cipher::normalized_cipher_text()
    {
        string cipher = this->cipher_text();
        int sz = this->size();
        string result;
        result.reserve(cipher.length() + sz);
        
        for (int i = 0; i < cipher.length(); i++)
        {
            result += cipher[i];
            if ((i + 1) % sz == 0 && i + 1 != cipher.length())
                result += " ";
        }
        return result;
    }

    vector<string> cipher::plain_text_segments()
    {
        string normPlain = this->normalize_plain_text();
        int sz = this->size();
        vector<string> result;
        result.reserve((normPlain.length() + sz - 1) / sz);
        
        for (int i = 0; i < normPlain.length(); i += sz)
        {
            result.emplace_back(normPlain.substr(i, sz));
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        result.reserve(_refStr.length());
        
        for (char c : _refStr)
        {
            if (std::isalnum(c))
                result += c;
        }
        return result;
    }

    bool cipher::char_is_not_alpha(char c)
    {
        return !std::isalnum(c);
    }
}