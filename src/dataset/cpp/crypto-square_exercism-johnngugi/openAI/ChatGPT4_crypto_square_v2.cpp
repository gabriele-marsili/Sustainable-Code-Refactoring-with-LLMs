#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <vector>

namespace crypto_square
{
    cipher::cipher(std::string text) : initial(std::move(text)) {}

    std::string cipher::normalize_plain_text()
    {
        std::string result;
        result.reserve(initial.size());

        for (char c : initial)
        {
            if (isalnum(c))
            {
                result += tolower(c);
            }
        }

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
        return calculate_size(normalize_plain_text());
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
        return create_segments(normalize_plain_text());
    }

    std::string cipher::cipher_text()
    {
        const auto segments = plain_text_segments();
        if (segments.empty()) return "";

        size_t rows = segments.size();
        size_t columns = segments[0].length();
        std::string result;
        result.reserve(rows * columns);

        for (size_t column = 0; column < columns; ++column)
        {
            for (size_t row = 0; row < rows; ++row)
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
        const auto segments = create_segments(cipher_text());
        if (segments.empty()) return "";

        std::string result;
        result.reserve(cipher_text().length() + segments.size() - 1);

        for (size_t i = 0; i < segments.size(); ++i)
        {
            if (i > 0) result += " ";
            result += segments[i];
        }

        return result;
    }
}