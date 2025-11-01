#include "bob.h"

#include <algorithm>
#include <cctype>
#include <string>

namespace bob {

std::string hey(const std::string& phrase) {
  std::string trimmed_phrase;
  std::remove_copy_if(phrase.begin(), phrase.end(), std::back_inserter(trimmed_phrase), ::isspace);

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