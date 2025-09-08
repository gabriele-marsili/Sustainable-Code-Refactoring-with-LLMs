#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <string>
#include <vector>
#include <cmath>

namespace crypto_square
{
    cipher::cipher(std::string text) : initial(std::move(text)) {}

    std::string cipher::normalize_plain_text()
    {
        std::string result;
        result.reserve(initial.length()); // Pre-allocate memory

        for (char c : initial)
        {
            if (std::isalnum(c))
            {
                result += std::tolower(c);
            }
        }

        return normalized_text = result; // Store normalized text
    }

    unsigned int cipher::size()
    {
        if (normalized_text.empty()) {
            normalize_plain_text();
        }
        
        size_t text_length = normalized_text.length();
        if (text_length == 0) return 0;

        return std::ceil(std::sqrt(text_length));
    }

    const std::vector<std::string> cipher::plain_text_segments()
    {
        if (normalized_text.empty()) {
            normalize_plain_text();
        }

        unsigned int segment_size = size();
        std::vector<std::string> segments;
        segments.reserve(std::ceil((double)normalized_text.length() / segment_size));

        for (size_t i = 0; i < normalized_text.length(); i += segment_size)
        {
            segments.emplace_back(normalized_text.substr(i, segment_size));
        }

        return segments;
    }

    std::string cipher::cipher_text()
    {
        const std::vector<std::string> &segments = plain_text_segments();
        if (segments.empty()) return "";

        size_t segment_size = segments[0].length();
        size_t num_segments = segments.size();
        std::string result;
        result.reserve(normalized_text.length());

        for (size_t col = 0; col < segment_size; ++col)
        {
            for (size_t row = 0; row < num_segments; ++row)
            {
                if (col < segments[row].length())
                {
                    result += segments[row][col];
                }
            }
        }

        return result;
    }

    std::string cipher::normalized_cipher_text()
    {
        std::string ciphertext = cipher_text();
        if (ciphertext.empty()) return "";

        unsigned int segment_size = size();
        std::string result;
        size_t num_segments = std::ceil((double)ciphertext.length() / segment_size);
        result.reserve(ciphertext.length() + num_segments - 1); // Pre-allocate space for spaces

        for (size_t i = 0; i < ciphertext.length(); ++i)
        {
            result += ciphertext[i];
            if ((i + 1) % segment_size == 0 && (i + 1) != ciphertext.length())
            {
                result += ' ';
            }
        }
        return result;
    }
}