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

      if (c != ' ' && c != '-') {
        if ((mask >> bit_position) & 1) {
          return false;
        }
        mask |= (1 << bit_position);
      }
    }
    p++;
  }

  return true;
}