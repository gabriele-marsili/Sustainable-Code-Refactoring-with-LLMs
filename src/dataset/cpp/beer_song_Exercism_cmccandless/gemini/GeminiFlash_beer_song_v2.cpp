#include "beer_song.h"
#include <string>

namespace beer {

std::string bottles(int n) {
  return (n == 1) ? " bottle" : " bottles";
}

std::string verse(int n) {
  std::string result;
  if (n > 0) {
    result += std::to_string(n);
  } else {
    result += "No more";
  }
  result += bottles(n) + " of beer on the wall, ";
  if (n > 0) {
    result += std::to_string(n);
  } else {
    result += "no more";
  }
  result += bottles(n) + " of beer.\n";

  if (n > 0) {
    result += "Take " + std::string((n == 1) ? "it" : "one") +
              " down and pass it around, ";
    if (n == 1) {
      result += "no more";
    } else {
      result += std::to_string(n - 1);
    }
  } else {
    result += "Go to the store and buy some more, 99";
  }
  result += bottles(n - 1) + " of beer on the wall.\n";
  return result;
}

std::string sing(int start, int stop) {
  std::string result;
  for (int i = start; i >= stop; --i) {
    result += verse(i);
    if (i > stop) {
      result += '\n';
    }
  }
  return result;
}
} // namespace beer