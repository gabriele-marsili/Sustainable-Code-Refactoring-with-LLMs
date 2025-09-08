#include "crypto_square.h"
#include <cmath>
#include <algorithm>

namespace crypto_square {
    cipher::cipher(const std::string& text) : _text(text) {}

    std::string cipher::normalize_plain_text() const {
        std::string res;
        res.reserve(_text.size());
        for (char c : _text) {
            if (std::isalnum(c)) {
                res.push_back(std::tolower(c));
            }
        }
        return res;
    }

    size_t find_cols(const size_t len) {
        size_t cols = std::ceil(std::sqrt(len));
        return cols;
    }

    std::vector<std::string> make_str_segments(const std::string& str, bool invert_cols = false) {
        std::vector<std::string> res;
        if (str.empty()) return res;

        size_t cols = find_cols(str.size());
        if (invert_cols) {
            cols = std::ceil(double(str.size()) / cols);
        }

        res.reserve((str.size() + cols - 1) / cols);
        for (size_t i = 0; i < str.size(); i += cols) {
            res.emplace_back(str.substr(i, cols));
        }

        return res;
    }

    std::vector<std::string> cipher::plain_text_segments() const {
        return make_str_segments(normalize_plain_text());
    }

    std::string cipher::cipher_text() const {
        const auto matrix = plain_text_segments();
        if (matrix.empty()) return "";

        const size_t cols = matrix[0].size();
        const size_t rows = matrix.size();
        std::string res;
        res.reserve(cols * rows);

        for (size_t i = 0; i < cols; ++i) {
            for (size_t j = 0; j < rows; ++j) {
                if (i < matrix[j].size()) {
                    res.push_back(matrix[j][i]);
                }
            }
        }
        return res;
    }

    std::string cipher::normalized_cipher_text() const {
        const auto segments = make_str_segments(cipher_text(), true);
        if (segments.empty()) return "";

        std::string res;
        res.reserve(segments.size() * (segments[0].size() + 1) - 1);

        for (const auto& segment : segments) {
            res += segment + " ";
        }
        res.pop_back();
        return res;
    }
}  // namespace crypto_square