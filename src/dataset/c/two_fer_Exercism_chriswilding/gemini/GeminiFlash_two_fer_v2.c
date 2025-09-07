#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name) {
  const char *name_to_use = (name != NULL) ? name : "you";
  strcpy(buffer, "One for ");
  strcat(buffer, name_to_use);
  strcat(buffer, ", one for me.");
}