#include "pangram.h"
#include <ctype.h>
#include <stdbool.h>
#include <stddef.h>

bool is_pangram(const char *sentence) {
  if (sentence == NULL) {
    return false;
  }

  int marked = 0;
  const char *ptr = sentence;

  while (*ptr) {
    unsigned char c = (unsigned char)tolower(*ptr);
    if (c >= 'a' && c <= 'z') {
      marked |= 1 << (c - 'a');
    }
    ptr++;
  }

  return marked == ((1 << 26) - 1);
}