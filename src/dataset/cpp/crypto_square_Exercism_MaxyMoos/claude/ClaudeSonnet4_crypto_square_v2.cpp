#include "crypto_square.h"
#include <algorithm>
#include <cmath>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input) : squareSize(-1)
    {
        this->_refStr.reserve(input.size());
        for (char c : input) {
            char lower = (c >= 'A' && c <= 'Z') ? c + 32 : c;
            this->_refStr += lower;
        }
    }

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
        if (normPlain.empty()) return "";
        
        int sz = this->size();
        string result;
        result.reserve(normPlain.length());
        
        for (int col = 0; col < sz; col++)
        {
            for (int row = 0; row < sz; row++)
            {
                int idx = row * sz + col;
                if (idx < normPlain.length())
                    result += normPlain[idx];
            }
        }
        return result;
    }

    string cipher::normalized_cipher_text()
    {
        string cipher = this->cipher_text();
        if (cipher.empty()) return "";
        
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
        
        if (normPlain.empty()) return result;
        
        int rows = (normPlain.length() + sz - 1) / sz;
        result.reserve(rows);
        
        for (int i = 0; i < rows; i++)
        {
            int start = i * sz;
            int end = min(start + sz, static_cast<int>(normPlain.length()));
            result.emplace_back(normPlain.substr(start, end - start));
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        result.reserve(this->_refStr.length());
        
        for (char c : this->_refStr)
        {
            if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
                result += c;
        }
        return result;
    }

    bool cipher::char_is_not_alpha(char c)
    {
        return !((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'));
    }
}