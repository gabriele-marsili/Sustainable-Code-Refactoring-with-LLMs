#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name) {
  const char *name_ptr = (name != NULL) ? name : "you";
  size_t name_len = strlen(name_ptr);
  const char prefix[] = "One for ";
  const char suffix[] = ", one for me.";
  size_t prefix_len = sizeof(prefix) - 1;
  size_t suffix_len = sizeof(suffix) - 1;

  memcpy(buffer, prefix, prefix_len);
  memcpy(buffer + prefix_len, name_ptr, name_len);
  memcpy(buffer + prefix_len + name_len, suffix, suffix_len);
  buffer[prefix_len + name_len + suffix_len] = '\0';
}