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
        result.reserve(initial.length());

        std::transform(initial.begin(), initial.end(), std::back_inserter(result), [](unsigned char c){
            if (std::isalnum(c)) {
                return std::tolower(c);
            }
            return '\0'; // or some other character that will be removed
        });

        result.erase(std::remove(result.begin(), result.end(), '\0'), result.end());
        return result;
    }

    unsigned int cipher::calculate_size(const std::string& text)
    {
        size_t text_length = text.length();
        if (text_length == 0) return 0;
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

    const std::vector<std::string> cipher::create_segments(const std::string& text)
    {
        unsigned int segment_size = calculate_size(text);
        std::vector<std::string> segments;
        segments.reserve((text.length() + segment_size - 1) / segment_size); // Pre-allocate

        for (size_t i = 0; i < text.length(); i += segment_size)
        {
            segments.emplace_back(text.substr(i, segment_size));
        }

        return segments;
    }

    const std::vector<std::string> cipher::plain_text_segments()
    {
        if (normalized_text.empty()) {
            normalized_text = normalize_plain_text();
        }
        return create_segments(normalized_text);
    }

    std::string cipher::cipher_text()
    {
        const std::vector<std::string> &segments = plain_text_segments();
        if (segments.empty()) return "";

        unsigned int columns = size();
        std::string result;
        result.reserve(normalized_text.length());

        for (unsigned int column = 0; column < columns; ++column)
        {
            for (const auto& segment : segments)
            {
                if (column < segment.length())
                {
                    result += segment[column];
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