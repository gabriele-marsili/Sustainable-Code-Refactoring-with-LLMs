#include "phone_number.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  const int phone_number_size = 10;
  char *output = malloc(phone_number_size + 1); // Allocate space for null terminator

  if (!output) {
    return NULL; // Handle allocation failure
  }

  int output_size = 0;
  size_t input_len = strlen(input);

  for (size_t i = 0; i < input_len; ++i) {
    char c = input[i];

    if (isdigit(c)) {
      if (output_size == 0 && c == '1') {
        continue; // Skip country code '1'
      }

      if ((output_size == 0 || output_size == 3) && (c < '2')) {
        free(output);
        char *invalid_number = strdup("0000000000");
        return invalid_number;
      }

      if (output_size < phone_number_size) {
        output[output_size++] = c;
      } else {
        free(output);
        char *invalid_number = strdup("0000000000");
        return invalid_number;
      }
    }
  }

  if (output_size != phone_number_size) {
    free(output);
    char *invalid_number = strdup("0000000000");
    return invalid_number;
  }

  output[phone_number_size] = '\0'; // Null-terminate the string
  return output;
}