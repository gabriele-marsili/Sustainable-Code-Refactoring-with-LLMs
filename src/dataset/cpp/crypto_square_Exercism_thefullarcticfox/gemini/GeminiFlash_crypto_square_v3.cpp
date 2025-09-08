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
  std::transform(_text.begin(), _text.end(), std::back_inserter(res), [](unsigned char c) {
    return std::isalnum(c) ? std::tolower(c) : '\0';
  });
  res.erase(std::remove(res.begin(), res.end(), '\0'), res.end());
  return res;
}

size_t find_cols(const size_t len) {
  if (len == 0) return 0;
  size_t cols = std::sqrt(len);
  size_t rows = (len + cols - 1) / cols;
  if (cols * rows < len) {
    cols++;
  }
  return cols;
}

std::vector<std::string> make_str_segments(const std::string& str, bool invert_cols = false) {
  std::vector<std::string> res;
  if (str.empty()) return res;

  size_t cols = find_cols(str.size());
  if (invert_cols) {
    cols = (str.size() + cols - 1) / cols;
  }

  size_t num_segments = (str.size() + cols - 1) / cols;
  res.reserve(num_segments);

  for (size_t i = 0; i < str.size(); i += cols) {
    res.emplace_back(str.substr(i, cols));
  }

  return res;
}

std::vector<std::string> cipher::plain_text_segments() const {
  return (make_str_segments(normalize_plain_text()));
}

std::string cipher::cipher_text() const {
  std::string normalized_text = normalize_plain_text();
  size_t cols = find_cols(normalized_text.size());
  std::string res;
  res.reserve(normalized_text.size());

  for (size_t i = 0; i < cols; ++i) {
    for (size_t j = 0; j * cols + i < normalized_text.size(); ++j) {
      res.push_back(normalized_text[j * cols + i]);
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
    res.append(encoded.substr(i * cols, cols));
    if (i < rows - 1) {
      res.push_back(' ');
    } else {
      size_t padding = cols - encoded.substr(i * cols, cols).size();
      res.append(padding, ' ');
    }
  }
  res.erase(std::find_if(res.rbegin(), res.rend(), [](int ch) {
                return !std::isspace(ch);
              }).base(), res.end());
  return res;
}

}  // namespace crypto_square