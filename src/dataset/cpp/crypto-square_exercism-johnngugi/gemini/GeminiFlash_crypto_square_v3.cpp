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

std::vector<std::string> cipher::create_segments(const std::string& text) {
  unsigned int segment_size = calculate_size(text);
  std::vector<std::string> segments;
  segments.reserve(
      (text.length() + segment_size - 1) /
      segment_size); // Pre-allocate memory for segments

  for (size_t i = 0; i < text.length(); i += segment_size) {
    segments.emplace_back(text.substr(i, segment_size));
  }

  return segments;
}

std::vector<std::string> cipher::plain_text_segments() {
  if (!normalized_text.has_value()) {
    normalized_text = normalize_plain_text();
  }
  return create_segments(normalized_text.value());
}

std::string cipher::cipher_text() {
  if (!normalized_text.has_value()) {
    normalized_text = normalize_plain_text();
  }
  const std::vector<std::string>& segments = plain_text_segments();
  unsigned int columns = size();
  std::string result;
  result.reserve(normalized_text.value().length());

  for (unsigned int column = 0; column < columns; ++column) {
    for (const auto& segment : segments) {
      if (column < segment.length()) {
        result += segment[column];
      }
    }
  }

  return result;
}

std::string cipher::normalized_cipher_text() {
  std::string encoded = cipher_text();
  unsigned int segment_size = size();
  std::string result;
  result.reserve(encoded.length() +
                   (encoded.length() / segment_size)); // Pre-allocate memory

  for (size_t i = 0; i < encoded.length(); ++i) {
    if (i > 0 && i % segment_size == 0) {
      result += ' ';
    }
    result += encoded[i];
  }

  return result;
}

} // namespace crypto_square