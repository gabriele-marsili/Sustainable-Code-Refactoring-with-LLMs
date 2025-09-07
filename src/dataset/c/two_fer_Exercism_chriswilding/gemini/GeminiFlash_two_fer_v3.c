#include "two_fer.h"

#include <string.h>

void two_fer(char *buffer, const char *name) {
  const char *person = (name != NULL && *name != '\0') ? name : "you";
  size_t person_len = strlen(person);
  const char prefix[] = "One for ";
  const char suffix[] = ", one for me.";
  size_t prefix_len = sizeof(prefix) - 1;
  size_t suffix_len = sizeof(suffix) - 1;

  memcpy(buffer, prefix, prefix_len);
  memcpy(buffer + prefix_len, person, person_len);
  memcpy(buffer + prefix_len + person_len, suffix, suffix_len);
  buffer[prefix_len + person_len + suffix_len] = '\0';
}