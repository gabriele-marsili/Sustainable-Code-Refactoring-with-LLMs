#include "phone_number.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  const int phone_number_size = 10;
  char *output = malloc(phone_number_size + 1); // +1 for null terminator
  if (!output) return NULL;

  int output_size = 0;
  for (const char *p = input; *p != '\0'; ++p) {
    if (isdigit(*p)) {
      if (output_size == 0 && *p == '1') continue;
      if ((output_size == 0 || output_size == 3) && (*p < '2')) {
        strcpy(output, "0000000000");
        output[phone_number_size] = '\0';
        return output;
      }
      if (output_size < phone_number_size) {
        output[output_size++] = *p;
      } else {
        free(output);
        char *invalid = strdup("0000000000");
        return invalid;
      }
    }
  }

  if (output_size != phone_number_size) {
    free(output);
    char *invalid = strdup("0000000000");
    return invalid;
  }

  output[phone_number_size] = '\0';
  return output;
}