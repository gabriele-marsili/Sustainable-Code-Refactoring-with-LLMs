#include "crypto_square.h"
#include <algorithm>
#include <cmath>
#include <cctype>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input)
    {
        this->_refStr.reserve(input.length());
        for (char c : input) {
            char lower = std::tolower(c);
            if (std::isalnum(lower)) {
                this->_refStr += lower;
            }
        }
    }

    int cipher::size()
    {
        if (this->squareSize == -1)
        {
            this->squareSize = static_cast<int>(std::ceil(std::sqrt(this->_refStr.length())));
        }
        return this->squareSize;
    }

    string cipher::cipher_text()
    {
        if (this->_refStr.empty()) return "";
        
        const int sz = this->size();
        const int len = this->_refStr.length();
        string result;
        result.reserve(len);
        
        for (int col = 0; col < sz; col++)
        {
            for (int row = 0; row < sz; row++)
            {
                int index = row * sz + col;
                if (index < len)
                    result += this->_refStr[index];
            }
        }
        return result;
    }

    string cipher::normalized_cipher_text()
    {
        string cipher = this->cipher_text();
        if (cipher.empty()) return "";
        
        const int sz = this->size();
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
        if (this->_refStr.empty()) return vector<string>();
        
        const int sz = this->size();
        const int len = this->_refStr.length();
        vector<string> result;
        result.reserve((len + sz - 1) / sz);
        
        for (int i = 0; i < len; i += sz)
        {
            int segmentLen = std::min(sz, len - i);
            result.emplace_back(this->_refStr.substr(i, segmentLen));
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        return this->_refStr;
    }

    bool cipher::char_is_not_alpha(char c)
    {
        return !std::isalnum(c);
    }
}