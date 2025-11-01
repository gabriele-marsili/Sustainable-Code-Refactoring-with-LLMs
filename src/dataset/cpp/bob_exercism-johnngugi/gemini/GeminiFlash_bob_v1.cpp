#include "bob.h"
#include <string>
#include <algorithm>
#include <cctype>

using namespace std;

string bob::hey(string statement) {
  // Trim leading and trailing whitespace
  size_t first = statement.find_first_not_of(' ');
  if (string::npos == first) {
    return "Fine. Be that way!";
  }
  size_t last = statement.find_last_not_of(' ');
  statement = statement.substr(first, (last - first + 1));

  bool all_uppercase = false;
  bool has_letters = false;
  for (char c : statement) {
    if (isalpha(c)) {
      has_letters = true;
      if (islower(c)) {
        all_uppercase = false;
        break;
      }
      all_uppercase = true;
    }
  }

  if (all_uppercase && has_letters) {
    return "Whoa, chill out!";
  }

  if (!statement.empty() && statement.back() == '?') {
    return "Sure.";
  }

  return "Whatever.";
}