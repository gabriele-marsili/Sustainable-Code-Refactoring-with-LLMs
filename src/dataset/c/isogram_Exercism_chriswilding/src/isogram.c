#include "isogram.h"

#include <ctype.h>
#include <stddef.h>
#include <string.h>

bool is_isogram(const char phrase[]) {
  if (phrase == NULL) {
    return false;
  }

  bool seen[26] = {false};

  for (size_t i = 0; i < strlen(phrase); i++) {
    char c = phrase[i];

    if (!isalpha(c)) {
      continue;
    }

    char lower = tolower(c);
    bool saw = seen[lower - 'a'];

    if (saw) {
      return false;
    }

    seen[lower - 'a'] = true;
  }

  return true;
}
