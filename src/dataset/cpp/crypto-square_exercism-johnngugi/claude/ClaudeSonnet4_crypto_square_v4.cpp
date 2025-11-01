#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <cmath>

namespace crypto_square
{
    cipher::cipher(std::string text) : initial(std::move(text))
    {
    }

    std::string cipher::normalize_plain_text()
    {
        std::string result;
        result.reserve(initial.size());

        for (char c : initial) {
            if (std::isalnum(c)) {
                result.push_back(std::tolower(c));
            }
        }

        initial = std::move(result);
        return initial;
    }

    unsigned int cipher::calculate_size(std::string text)
    {
        size_t text_length = text.length();
        if (text_length == 0) return 0;
        
        unsigned int column = static_cast<unsigned int>(std::sqrt(text_length));
        if (column * column < text_length) {
            ++column;
        }
        
        return column;
    }

    unsigned int cipher::size()
    {
        return calculate_size(normalize_plain_text());
    }

    const std::vector<std::string> cipher::create_segments(std::string text)
    {
        unsigned int segment_size = calculate_size(text);
        if (segment_size == 0) return {};
        
        std::vector<std::string> segments;
        size_t text_length = text.length();
        size_t num_segments = (text_length + segment_size - 1) / segment_size;
        segments.reserve(num_segments);

        for (size_t i = 0; i < text_length; i += segment_size) {
            size_t remaining = text_length - i;
            size_t current_size = std::min(static_cast<size_t>(segment_size), remaining);
            segments.emplace_back(text.substr(i, current_size));
        }

        return segments;
    }

    const std::vector<std::string> cipher::plain_text_segments()
    {
        return create_segments(normalize_plain_text());
    }

    std::string cipher::cipher_text()
    {
        const std::vector<std::string> segments = plain_text_segments();
        if (segments.empty()) return "";
        
        size_t rows = segments.size();
        size_t columns = segments[0].length();
        
        std::string result;
        result.reserve(initial.size());

        for (size_t column = 0; column < columns; ++column) {
            for (size_t row = 0; row < rows; ++row) {
                if (column < segments[row].length()) {
                    result.push_back(segments[row][column]);
                }
            }
        }

        return result;
    }

    std::string cipher::normalized_cipher_text()
    {
        const std::vector<std::string> segments = create_segments(cipher_text());
        if (segments.empty()) return "";
        
        std::string result = segments[0];
        
        for (size_t i = 1; i < segments.size(); ++i) {
            result += " " + segments[i];
        }

        return result;
    }
}