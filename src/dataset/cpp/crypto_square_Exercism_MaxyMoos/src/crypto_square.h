#ifndef CRYPTO_SQUARE_H_
#define CRYPTO_SQUARE_H_

#include <vector>
#include <string>

namespace crypto_square
{
    class cipher
    {
        std::string _refStr = "";
        int squareSize = -1;
        std::vector<std::string> _strLines;
    public:
        cipher(std::string input);
        int size();
        std::string cipher_text();
        std::string normalized_cipher_text();
        std::vector<std::string> plain_text_segments();
        std::string normalize_plain_text() const;
    protected:
        static bool char_is_not_alpha(char c);
    };
}

#endif