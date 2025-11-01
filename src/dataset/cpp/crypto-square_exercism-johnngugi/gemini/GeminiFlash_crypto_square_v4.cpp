#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <cmath>
#include <string>
#include <vector>

namespace crypto_square
{
    cipher::cipher(std::string text) : initial(std::move(text)) {}

    std::string cipher::normalize_plain_text()
    {
        std::string result;
        result.reserve(initial.length());

        std::transform(initial.begin(), initial.end(), std::back_inserter(result), [](unsigned char c){
            if (std::isalnum(c)) {
                return std::tolower(c);
            }
            return '\0'; // Or any character that will be filtered out
        });

        result.erase(std::remove(result.begin(), result.end(), '\0'), result.end());
        initial = result;
        return result;
    }

    unsigned int cipher::calculate_size(const std::string& text)
    {
        size_t text_length = text.length();
        return static_cast<unsigned int>(std::ceil(std::sqrt(text_length)));
    }

    unsigned int cipher::size()
    {
        if (cached_size == 0) {
            normalized_text = normalize_plain_text();
            cached_size = calculate_size(normalized_text);
        }
        return cached_size;
    }

    std::vector<std::string> cipher::create_segments(const std::string& text)
    {
        unsigned int segment_size = calculate_size(text);
        std::vector<std::string> segments;
        segments.reserve((text.length() + segment_size - 1) / segment_size);

        for (size_t i = 0; i < text.length(); i += segment_size)
        {
            segments.emplace_back(text.substr(i, segment_size));
        }

        return segments;
    }

    std::vector<std::string> cipher::plain_text_segments()
    {
        if (normalized_text.empty()) {
            normalized_text = normalize_plain_text();
        }
        return create_segments(normalized_text);
    }

    std::string cipher::cipher_text()
    {
        if (normalized_text.empty()) {
            normalized_text = normalize_plain_text();
        }
        unsigned int columns = size();
        size_t rows = (normalized_text.length() + columns - 1) / columns;
        std::string result;
        result.reserve(normalized_text.length());

        for (unsigned int column = 0; column < columns; ++column)
        {
            for (size_t row = 0; row < rows; ++row)
            {
                size_t index = row * columns + column;
                if (index < normalized_text.length())
                {
                    result += normalized_text[index];
                }
            }
        }

        return result;
    }

    std::string cipher::normalized_cipher_text()
    {
        std::string encoded = cipher_text();
        unsigned int segment_size = size();
        std::string result;
        result.reserve(encoded.length() + (encoded.length() / segment_size));

        for (size_t i = 0; i < encoded.length(); ++i)
        {
            if (i > 0 && i % segment_size == 0)
            {
                result += ' ';
            }
            result += encoded[i];
        }

        return result;
    }
}