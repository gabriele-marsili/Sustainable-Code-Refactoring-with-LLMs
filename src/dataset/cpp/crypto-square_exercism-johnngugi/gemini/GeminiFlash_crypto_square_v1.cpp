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
  result.reserve(initial.length()); // Reserve space to avoid reallocations

  for (char c : initial) {
    if (isalnum(c)) {
      result += static_cast<char>(tolower(c));
    }
  }

  return normalized_text = result; // Store normalized text
}

unsigned int cipher::size() {
  if (normalized_text.empty()) {
    normalize_plain_text(); // Ensure normalized_text is populated
  }
  if (cached_size == 0) {
    cached_size = calculate_size(normalized_text);
  }
  return cached_size;
}

unsigned int cipher::calculate_size(const std::string& text) {
  size_t text_length = text.length();
  return static_cast<unsigned int>(ceil(sqrt(text_length)));
}

const std::vector<std::string> cipher::create_segments(const std::string& text) {
  unsigned int segment_size = size();
  std::vector<std::string> segments;
  segments.reserve((text.length() + segment_size - 1) / segment_size); // Reserve space

  for (size_t i = 0; i < text.length(); i += segment_size) {
    segments.emplace_back(text.substr(i, segment_size));
  }
  return segments;
}

const std::vector<std::string> cipher::plain_text_segments() {
  if (normalized_text.empty()) {
    normalize_plain_text();
  }
  return create_segments(normalized_text);
}

std::string cipher::cipher_text() {
  const std::vector<std::string> segments = plain_text_segments();
  if (segments.empty()) return "";

  unsigned int segment_size = size();
  std::string result;
  result.reserve(segments.size() * segment_size);

  for (unsigned int col = 0; col < segment_size; ++col) {
    for (const auto& segment : segments) {
      if (col < segment.length()) {
        result += segment[col];
      }
    }
  }
  return result;
}

std::string cipher::normalized_cipher_text() {
  std::string ciphertext = cipher_text();
  unsigned int segment_size = size();
  std::string result;
  result.reserve(ciphertext.length() + (ciphertext.length() / segment_size)); // Reserve space

  for (size_t i = 0; i < ciphertext.length(); ++i) {
    result += ciphertext[i];
    if ((i + 1) % segment_size == 0 && (i + 1) != ciphertext.length()) {
      result += ' ';
    }
  }
  return result;
}

} // namespace crypto_square