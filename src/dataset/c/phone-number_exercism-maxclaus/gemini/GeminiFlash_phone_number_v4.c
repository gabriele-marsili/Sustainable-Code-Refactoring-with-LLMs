#include "phone_number.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  const int phone_number_size = 10;
  char *output = calloc(phone_number_size + 1, sizeof(char));
  if (!output) return NULL;

  int output_size = 0;
  const char *p = input;

  while (*p != '\0') {
    if (isdigit(*p)) {
      if (output_size == 0 && *p == '1') {
        p++;
        continue;
      }

      if ((output_size == 0 || output_size == 3) && (*p < '2')) {
        strcpy(output, "0000000000");
        return output;
      }

      if (output_size < phone_number_size) {
        output[output_size++] = *p;
      } else {
        strcpy(output, "0000000000");
        return output;
      }
    }
    p++;
  }

  if (output_size != phone_number_size) {
    strcpy(output, "0000000000");
  }
  return output;
}