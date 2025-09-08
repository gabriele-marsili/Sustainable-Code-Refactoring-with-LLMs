#include "isogram.h"

#include <ctype.h>
#include <stddef.h>

bool is_isogram(const char phrase[]) {
  if (phrase == NULL) {
    return false;
  }

  bool seen[26] = {false};

  for (const char *p = phrase; *p; p++) {
    char c = *p;

    if (!isalpha(c)) {
      continue;
    }

    char lower = tolower(c);
    int index = lower - 'a';

    if (seen[index]) {
      return false;
    }

    seen[index] = true;
  }

  return true;
}