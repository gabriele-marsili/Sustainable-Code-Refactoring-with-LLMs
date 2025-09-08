#include "isogram.h"
#include <ctype.h>
#include <stdbool.h>

bool is_isogram(const char phrase[]) {
  if (phrase == NULL) {
    return false;
  }

  unsigned int mask = 0;
  const char *p = phrase;

  while (*p) {
    char c = *p;

    if (isalpha(c)) {
      c = tolower(c);
      unsigned int bit_position = c - 'a';

      if (bit_position >= 26) {
        p++;
        continue;
      }
      
      if ((mask & (1 << bit_position)) != 0) {
        return false;
      }

      mask |= (1 << bit_position);
    }
    p++;
  }

  return true;
}