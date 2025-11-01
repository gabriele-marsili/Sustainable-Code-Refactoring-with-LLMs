#include "bob.h"

#include <algorithm>
#include <cctype>
#include <string>

namespace bob {

std::string trim(const std::string& str) {
  size_t first = str.find_first_not_of(' ');
  if (std::string::npos == first) {
    return "";
  }
  size_t last = str.find_last_not_of(' ');
  return str.substr(first, (last - first + 1));
}

std::string response(const std::string& phrase) {
  std::string trimmed_phrase = trim(phrase);

  if (trimmed_phrase.empty()) {
    return "Fine. Be that way!";
  }

  bool is_upper = false;
  bool has_letters = false;
  for (char c : trimmed_phrase) {
    if (std::isalpha(c)) {
      has_letters = true;
      if (std::islower(c)) {
        is_upper = false;
        break;
      } else {
        is_upper = true;
      }
    }
  }

  bool is_question = !trimmed_phrase.empty() && trimmed_phrase.back() == '?';

  if (is_upper && has_letters) {
    if (is_question) {
      return "Calm down, I know what I'm doing!";
    } else {
      return "Whoa, chill out!";
    }
  } else if (is_question) {
    return "Sure.";
  } else {
    return "Whatever.";
  }
}

} // namespace bob