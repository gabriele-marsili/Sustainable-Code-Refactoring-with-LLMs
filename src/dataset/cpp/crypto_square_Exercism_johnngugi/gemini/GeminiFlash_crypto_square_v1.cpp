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
                result += tolower(c);
            }
        }

        return normalized_text = result; // Store normalized text
    }

    unsigned int cipher::size()
    {
        if (normalized_text.empty()) {
            normalize_plain_text(); // Ensure normalized text is computed
        }
        if (cached_size == 0) {
            cached_size = calculate_size(normalized_text);
        }
        return cached_size;
    }

    unsigned int cipher::calculate_size(const std::string& text)
    {
        size_t text_length = text.length();
        if (text_length == 0) return 0;

        unsigned int column = static_cast<unsigned int>(std::ceil(std::sqrt(text_length)));
        return column;
    }

    const std::vector<std::string> cipher::create_segments(const std::string& text)
    {
        unsigned int segment_size = size();
        std::vector<std::string> segments;
        if (segment_size == 0) return segments;

        segments.reserve( (text.length() + segment_size - 1) / segment_size ); // Reserve space

        for (size_t i = 0; i < text.length(); i += segment_size)
        {
            segments.emplace_back(text.substr(i, segment_size));
        }

        return segments;
    }

    const std::vector<std::string> cipher::plain_text_segments()
    {
        if (normalized_text.empty()) {
            normalize_plain_text();
        }
        return create_segments(normalized_text);
    }

    std::string cipher::cipher_text()
    {
        const std::vector<std::string> segments = plain_text_segments();
        if (segments.empty()) return "";

        unsigned int rows = segments.size();
        unsigned int columns = size();

        std::string result;
        result.reserve(rows * columns);

        for (unsigned int column = 0; column < columns; ++column)
        {
            for (unsigned int row = 0; row < rows; ++row)
            {
                if (column < segments[row].length())
                {
                    result += segments[row][column];
                }
            }
        }

        return result;
    }

    std::string cipher::normalized_cipher_text()
    {
        std::string encoded = cipher_text();
        unsigned int segment_size = size();
        std::vector<std::string> segments;

        for (size_t i = 0; i < encoded.length(); i += segment_size)
        {
            segments.emplace_back(encoded.substr(i, segment_size));
        }

        std::string result;
        if (!segments.empty()) {
            result = segments[0];
            for (size_t i = 1; i < segments.size(); ++i)
            {
                result += " " + segments[i];
            }
        }
        return result;
    }
}