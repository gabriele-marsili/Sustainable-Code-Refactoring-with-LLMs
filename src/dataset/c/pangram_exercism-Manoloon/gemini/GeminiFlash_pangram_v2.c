#include "pangram.h"
#include <ctype.h>
#include <stdbool.h>

bool is_pangram(const char *sentence) {
  if (sentence == NULL) {
    return false;
  }

  int marked = 0;
  int count = 0;

  for (int i = 0; sentence[i] != '\0' && count < 26; ++i) {
    unsigned char c = (unsigned char)tolower(sentence[i]);
    if (c >= 'a' && c <= 'z') {
      int index = c - 'a';
      if (!(marked & (1 << index))) {
        marked |= (1 << index);
        count++;
      }
    }
  }

  return count == 26;
}