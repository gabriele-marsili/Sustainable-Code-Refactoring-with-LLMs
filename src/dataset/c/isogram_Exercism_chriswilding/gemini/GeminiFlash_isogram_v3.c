#include "isogram.h"

#include <ctype.h>
#include <stdbool.h>
#include <stddef.h>

bool is_isogram(const char phrase[]) {
  if (phrase == NULL) {
    return false;
  }

  bool seen[26] = {false};
  size_t i = 0;

  while (phrase[i] != '\0') {
    char c = phrase[i];
    i++;

    if (!isalpha(c)) {
      continue;
    }

    char lower = tolower(c);
    size_t index = lower - 'a';

    if (seen[index]) {
      return false;
    }

    seen[index] = true;
  }

  return true;
}