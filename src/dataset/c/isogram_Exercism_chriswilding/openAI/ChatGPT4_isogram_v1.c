#include "isogram.h"

#include <ctype.h>
#include <stddef.h>

bool is_isogram(const char phrase[]) {
  if (!phrase) {
    return false;
  }

  unsigned int seen = 0;

  for (size_t i = 0; phrase[i] != '\0'; i++) {
    char c = phrase[i];

    if (isalpha(c)) {
      char lower = tolower(c);
      unsigned int mask = 1U << (lower - 'a');

      if (seen & mask) {
        return false;
      }

      seen |= mask;
    }
  }

  return true;
}