#include "isogram.h"
#include <ctype.h>
#include <stdbool.h>

bool is_isogram(const char phrase[]) {
  if (phrase == NULL) {
    return false;
  }

  bool alpha[26] = {false};
  const char *p = phrase;

  while (*p) {
    unsigned char c = (unsigned char)*p;
    if (isalpha(c)) {
      int alpha_i = tolower(c) - 'a';
      if (alpha[alpha_i]) {
        return false;
      }
      alpha[alpha_i] = true;
    }
    p++;
  }

  return true;
}