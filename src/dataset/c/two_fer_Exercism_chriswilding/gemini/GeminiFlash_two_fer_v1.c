#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name) {
  const char *name_ptr = (name != NULL) ? name : "you";
  size_t name_len = strlen(name_ptr);

  strcpy(buffer, "One for ");
  strcpy(buffer + 8, name_ptr);
  strcpy(buffer + 8 + name_len, ", one for me.");
}