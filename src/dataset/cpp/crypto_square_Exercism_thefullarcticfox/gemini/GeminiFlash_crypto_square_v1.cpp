#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <cmath>
#include <string>
#include <vector>

namespace crypto_square {
cipher::cipher(const std::string &text) : _text(text) {}

std::string cipher::normalize_plain_text() const {
  std::string res;
  res.reserve(_text.size());
  std::transform(_text.begin(), _text.end(), std::back_inserter(res),
                 [](unsigned char c) {
                   return std::isalnum(c) ? std::tolower(c) : '\0';
                 });
  res.erase(std::remove(res.begin(), res.end(), '\0'), res.end());
  return res;
}

size_t find_cols(const size_t len) {
  if (len == 0)
    return 0;

  size_t cols = std::sqrt(len);
  size_t rows = (len + cols - 1) / cols; // Equivalent to ceil(len / cols)

  if (cols * rows < len) {
    cols++;
    rows = (len + cols - 1) / cols;
  }

  if (rows < cols)
    std::swap(rows, cols);

  return cols;
}

std::vector<std::string> make_str_segments(const std::string &str,
                                           bool invert_cols = false) {
  std::vector<std::string> res;
  if (str.empty())
    return res;

  size_t cols = find_cols(str.size());
  if (invert_cols)
    cols = (str.size() + cols - 1) / cols; // ceil(str.size() / cols)

  size_t i = 0;
  while (i < str.size()) {
    res.push_back(str.substr(i, cols));
    i += cols;
  }
  return res;
}

std::vector<std::string> cipher::plain_text_segments() const {
  return (make_str_segments(normalize_plain_text()));
}

std::string cipher::cipher_text() const {
  std::string normalized = normalize_plain_text();
  size_t cols = find_cols(normalized.size());
  size_t rows = (normalized.size() + cols - 1) / cols;
  std::string res;
  res.reserve(normalized.size());

  for (size_t i = 0; i < cols; ++i) {
    for (size_t j = 0; j < rows; ++j) {
      size_t index = j * cols + i;
      if (index < normalized.size()) {
        res += normalized[index];
      }
    }
  }
  return res;
}

std::string cipher::normalized_cipher_text() const {
  std::string encoded = cipher_text();
  size_t cols = find_cols(encoded.size());
  size_t rows = (encoded.size() + cols - 1) / cols;
  std::string res;
  res.reserve(rows * (cols + 1));

  for (size_t i = 0; i < rows; ++i) {
    for (size_t j = 0; j < cols; ++j) {
      size_t index = j * rows + i;
      if (index < encoded.size()) {
        res += encoded[index];
      } else {
        res += ' ';
      }
    }
    if (i < rows - 1)
      res += ' ';
  }
  return res;
}
} // namespace crypto_square