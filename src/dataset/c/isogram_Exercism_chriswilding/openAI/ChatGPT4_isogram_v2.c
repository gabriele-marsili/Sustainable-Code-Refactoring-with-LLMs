#include "isogram.h"

#include <ctype.h>
#include <stddef.h>

bool is_isogram(const char phrase[]) {
  if (!phrase) {
    return false;
  }

  unsigned int seen = 0;

  for (const char *p = phrase; *p != '\0'; p++) {
    if (isalpha(*p)) {
      char lower = tolower(*p);
      unsigned int mask = 1u << (lower - 'a');

      if (seen & mask) {
        return false;
      }

      seen |= mask;
    }
  }

  return true;
}