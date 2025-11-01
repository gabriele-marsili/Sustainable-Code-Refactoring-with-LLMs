#include "bob.h"
#include <algorithm>
#include <cctype>
#include <string>

namespace bob {

std::string hey(const std::string& phrase) {
  std::string trimmed_phrase = phrase;
  trimmed_phrase.erase(0, trimmed_phrase.find_first_not_of(" \t\n\r"));
  trimmed_phrase.erase(trimmed_phrase.find_last_not_of(" \t\n\r") + 1);

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
    return "Whoa, chill out!";
  } else if (is_question) {
    return "Sure.";
  } else {
    return "Whatever.";
  }
}

} // namespace bob