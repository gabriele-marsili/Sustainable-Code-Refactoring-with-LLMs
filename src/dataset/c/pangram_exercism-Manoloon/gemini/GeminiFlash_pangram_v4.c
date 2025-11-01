#include "pangram.h"
#include <ctype.h>
#include <stdbool.h>
#include <string.h>

bool is_pangram(const char *sentence) {
  if (sentence == NULL) {
    return false;
  }

  bool alphabet[26] = {false};
  size_t sentence_length = strlen(sentence);
  int letters_found = 0;

  for (size_t i = 0; i < sentence_length; ++i) {
    unsigned char c = (unsigned char)sentence[i];
    if (isalpha(c)) {
      unsigned char lower_c = tolower(c);
      int index = lower_c - 'a';
      if (!alphabet[index]) {
        alphabet[index] = true;
        letters_found++;
        if (letters_found == 26) {
          return true;
        }
      }
    }
  }

  return letters_found == 26;
}