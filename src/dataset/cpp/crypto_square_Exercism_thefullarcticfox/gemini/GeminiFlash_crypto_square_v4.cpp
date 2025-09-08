#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <cmath>
#include <string>
#include <vector>

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
  size_t cols = std::sqrt(len);
  size_t rows = (len + cols - 1) / cols; // Equivalent to ceil(len / cols)

  if (cols * rows < len) {
    cols++;
    rows = (len + cols - 1) / cols;
  }

  if (rows < cols) {
    std::swap(rows, cols);
  }

  return cols;
}

std::vector<std::string> make_str_segments(const std::string& str,
                                            bool invert_cols = false) {
  std::vector<std::string> res;
  if (str.empty()) {
    return res;
  }

  size_t cols = find_cols(str.size());
  if (invert_cols) {
    cols = (str.size() + cols - 1) / cols; // Equivalent to ceil(str.size() / cols)
  }

  size_t num_segments = (str.size() + cols - 1) / cols;
  res.reserve(num_segments);

  for (size_t i = 0; i < str.size(); i += cols) {
    res.push_back(str.substr(i, cols));
  }

  return res;
}

std::vector<std::string> cipher::plain_text_segments() const {
  return (make_str_segments(normalize_plain_text()));
}

std::string cipher::cipher_text() const {
  std::string normalized_text = normalize_plain_text();
  std::vector<std::string> matrix = make_str_segments(normalized_text);
  std::string res;

  if (matrix.empty()) {
    return res;
  }

  size_t num_cols = matrix[0].size();
  size_t num_rows = matrix.size();
  res.reserve(normalized_text.size());

  for (size_t i = 0; i < num_cols; ++i) {
    for (size_t j = 0; j < num_rows; ++j) {
      if (i < matrix[j].size()) {
        res.push_back(matrix[j][i]);
      }
    }
  }
  return res;
}

std::string cipher::normalized_cipher_text() const {
  std::string encoded = cipher_text();
  std::vector<std::string> segments = make_str_segments(encoded, true);

  if (segments.empty()) {
    return "";
  }

  size_t max_len = segments[0].size();
  std::string res;
  res.reserve(segments.size() * (max_len + 1));

  for (auto& segment : segments) {
    res += segment;
    if (segment.size() < max_len) {
      res.append(max_len - segment.size(), ' ');
    }
    res += " ";
  }

  res.pop_back();
  return res;
}
} // namespace crypto_square