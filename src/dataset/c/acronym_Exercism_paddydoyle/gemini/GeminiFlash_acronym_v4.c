#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *abbreviate(const char *phrase) {
  if (phrase == NULL || *phrase == '\0') {
    return NULL;
  }

  size_t phrase_len = strlen(phrase);
  char *abbrev = malloc(phrase_len + 1); // Allocate enough space initially
  if (abbrev == NULL) {
    return NULL; // Handle malloc failure gracefully
  }

  size_t abbrev_index = 0;
  int new_word = 1; // Flag to indicate the start of a new word

  for (size_t i = 0; i < phrase_len; ++i) {
    if (isalpha(phrase[i])) {
      if (new_word) {
        abbrev[abbrev_index++] = toupper(phrase[i]);
        new_word = 0;
      }
    } else if (phrase[i] == ' ' || phrase[i] == '-') {
      new_word = 1;
    }
  }

  abbrev[abbrev_index] = '\0';

  // Resize the allocated memory to the actual length of the acronym
  char *resized_abbrev = realloc(abbrev, abbrev_index + 1);
  if (resized_abbrev == NULL) {
    // realloc can return NULL without freeing the original pointer
    // so we only free abbrev if realloc fails and abbrev != NULL
    free(abbrev);
    return NULL;
  }

  return resized_abbrev;
}