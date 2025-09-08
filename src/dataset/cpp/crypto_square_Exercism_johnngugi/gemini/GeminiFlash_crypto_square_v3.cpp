#include "crypto_square.h"
#include <algorithm>
#include <cctype>
#include <cmath>
#include <string>
#include <vector>

namespace crypto_square {

cipher::cipher(std::string text) : initial(std::move(text)) {}

std::string cipher::normalize_plain_text() {
  std::string result;
  result.reserve(initial.length()); // Pre-allocate memory

  for (char c : initial) {
    if (isalnum(c)) {
      result += static_cast<char>(tolower(c));
    }
  }

  return result;
}

unsigned int cipher::calculate_size(const std::string& text) {
  size_t text_length = text.length();
  return static_cast<unsigned int>(ceil(sqrt(text_length)));
}

unsigned int cipher::size() {
  if (!normalized_text.has_value()) {
    normalized_text = normalize_plain_text();
  }
  return calculate_size(normalized_text.value());
}

const std::vector<std::string> cipher::create_segments(const std::string& text) {
  unsigned int size = calculate_size(text);
  std::vector<std::string> segments;
  segments.reserve(
      (text.length() + size - 1) /
      size); // Reserve space to avoid reallocations.  Ceiling division.

  for (size_t i = 0; i < text.length(); i += size) {
    segments.emplace_back(text.substr(i, size));
  }

  return segments;
}

const std::vector<std::string> cipher::plain_text_segments() {
  if (!normalized_text.has_value()) {
    normalized_text = normalize_plain_text();
  }
  return create_segments(normalized_text.value());
}

std::string cipher::cipher_text() {
  const std::vector<std::string> &segments = plain_text_segments();
  if (segments.empty()) return "";

  size_t rows = segments.size();
  size_t columns = segments[0].length();
  std::string result;
  result.reserve(rows * columns);

  for (size_t column = 0; column < columns; ++column) {
    for (size_t row = 0; row < rows; ++row) {
      if (column < segments[row].length()) {
        result += segments[row][column];
      }
    }
  }

  return result;
}

std::string cipher::normalized_cipher_text() {
  std::string encoded = cipher_text();
  unsigned int size = calculate_size(encoded);

  std::string result;
  for (size_t i = 0; i < encoded.length(); ++i) {
    if (i > 0 && i % size == 0) {
      result += " ";
    }
    result += encoded[i];
  }
  return result;
}

} // namespace crypto_square