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
        result.reserve(initial.length()); // Reserve space to avoid reallocations

        for (char c : initial)
        {
            if (isalnum(c))
            {
                result += static_cast<char>(std::tolower(c));
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
        return static_cast<unsigned int>(std::ceil(std::sqrt(text_length)));
    }

    std::vector<std::string> cipher::plain_text_segments()
    {
        if (normalized_text.empty()) {
            normalize_plain_text();
        }
        unsigned int segment_size = size();
        std::vector<std::string> segments;
        size_t text_length = normalized_text.length();
        size_t num_segments = (text_length + segment_size - 1) / segment_size; // Ceiling division
        segments.reserve(num_segments);

        for (size_t i = 0; i < text_length; i += segment_size)
        {
            segments.emplace_back(normalized_text.substr(i, segment_size));
        }

        return segments;
    }

    std::string cipher::cipher_text()
    {
        const std::vector<std::string> &segments = plain_text_segments();
        size_t num_segments = segments.size();
        if (num_segments == 0) return "";

        size_t segment_size = segments[0].length();
        std::string result;
        result.reserve(num_segments * segment_size);

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
        std::string encoded = cipher_text();
        size_t encoded_length = encoded.length();
        unsigned int segment_size = size();
        size_t num_segments = (encoded_length + segment_size - 1) / segment_size;

        std::string result;
        result.reserve(encoded_length + num_segments - 1); // Pre-allocate space for spaces

        for (size_t i = 0; i < encoded_length; ++i)
        {
            result += encoded[i];
            if ((i + 1) % segment_size == 0 && (i + 1) != encoded_length)
            {
                result += ' ';
            }
        }
        return result;
    }
}