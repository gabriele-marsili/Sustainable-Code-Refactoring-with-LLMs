#include "isogram.h"

#include <ctype.h>
#include <stddef.h>

bool is_isogram(const char phrase[]) {
  if (phrase == NULL) {
    return false;
  }

  bool seen[26] = {false};

  for (const char *p = phrase; *p; p++) {
    if (!isalpha(*p)) {
      continue;
    }

    int index = tolower(*p) - 'a';
    
    if (seen[index]) {
      return false;
    }

    seen[index] = true;
  }

  return true;
}