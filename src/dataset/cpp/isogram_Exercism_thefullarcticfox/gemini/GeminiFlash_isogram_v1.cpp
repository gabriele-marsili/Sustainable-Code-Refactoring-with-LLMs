#include "isogram.h"
#include <algorithm>
#include <cctype>
#include <string>

namespace isogram {

bool is_isogram(const std::string& s) {
  if (s.empty()) {
    return true;
  }

  std::string cleaned_string;
  cleaned_string.reserve(s.size());

  for (char c : s) {
    if (std::isalpha(c)) {
      cleaned_string.push_back(static_cast<char>(std::tolower(c)));
    }
  }

  if (cleaned_string.empty()) {
      return true;
  }

  std::sort(cleaned_string.begin(), cleaned_string.end());

  for (size_t i = 1; i < cleaned_string.size(); ++i) {
    if (cleaned_string[i - 1] == cleaned_string[i]) {
      return false;
    }
  }

  return true;
}

} // namespace isogram