#include "crypto_square.h"
#include <algorithm>
#include <iostream>
#include <boost/algorithm/string.hpp>

using namespace std;

namespace crypto_square
{
    cipher::cipher(string input)
    {
        this->_refStr = boost::algorithm::to_lower_copy(input);
    }

    int cipher::size()
    {
        if (this->squareSize == -1)
        {
            string normPlain = this->normalize_plain_text();
            int lines = 0;
            while ( lines * lines < normPlain.length() )
                lines++;
            this->squareSize = lines;
        }
        return this->squareSize;
    }

    string cipher::cipher_text()
    {
        string result;
        vector<string> plainSeg = this->plain_text_segments();
        for (int i = 0 ; i < this->size() ; i++)
        {
            for (vector<string>::iterator it = plainSeg.begin(); it != plainSeg.end(); it++)
            {
                if (! (i >= (*it).length()) )
                    result += (*it)[i];
            }
        }
        return result;
    }

    string cipher::normalized_cipher_text()
    {
        string result;
        string cipher = this->cipher_text();
        int count = 1;
        for (string::iterator it = cipher.begin(); it != cipher.end(); it++)
        {
            result += *it;
            if (count % this->size() == 0 && count != 0)
                result += " ";
            count++;
        }
        boost::algorithm::trim_right(result);
        return result;
    }

    vector<string> cipher::plain_text_segments()
    {
        vector<string> result;
        string normPlain = this->normalize_plain_text();
        for (string::iterator it = normPlain.begin(); it != normPlain.end(); it++)
        {
            if (!result.empty() && result.back().length() < this->size())
                result.back() += *it;
            else
            {  
                string tmp = "";
                tmp += *it;
                result.push_back(tmp);
            }
        }
        return result;
    }

    string cipher::normalize_plain_text() const
    {
        string result;
        for (string::const_iterator it = this->_refStr.begin(); it != this->_refStr.end(); it++)
        {
            if (!char_is_not_alpha(*it))
                result += *it;
        }
        return result;
    }

    bool cipher::char_is_not_alpha(char c)
    {
        return !(c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' || c >= '0' && c <= '9');
    }
}