#include "phone_number.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  const int phone_number_size = 10;
  const int len = strlen(input);

  char *output = calloc(phone_number_size + 1, sizeof(char));
  if (!output) return NULL;

  int output_size = 0;
  
  for (int i = 0; i < len && output_size <= phone_number_size; i++) {
    char c = input[i];

    if (!isdigit(c)) continue;

    if (output_size == 0 && c == '1') continue;

    if ((output_size == 0 || output_size == 3) && (c < '2')) {
      memset(output, '0', phone_number_size);
      return output;
    }

    if (output_size >= phone_number_size) {
      memset(output, '0', phone_number_size);
      return output;
    }

    output[output_size++] = c;
  }

  if (output_size != phone_number_size) {
    memset(output, '0', phone_number_size);
  }

  return output;
}

char *phone_number_clean_v2(const char *input) {
  return phone_number_clean(input);
}

char *phone_number_clean_v1(const char *input) {
  const int phone_number_size = 10;
  const int len = strlen(input);

  char *output = malloc(phone_number_size + 1);
  if (!output) return NULL;

  int output_size = 0;
  bool is_valid = true;

  for (int i = 0; i < len; i++) {
    char c = input[i];

    if (!isdigit(c)) continue;

    if (output_size == 0 && c == '1') continue;

    if (output_size == 0 || output_size == 3) {
      if (c < '2') {
        is_valid = false;
        break;
      }
    }

    if (output_size >= phone_number_size) {
      is_valid = false;
      break;
    }

    output[output_size++] = c;
  }

  if (output_size != phone_number_size) {
    is_valid = false;
  }

  if (!is_valid) {
    memset(output, '0', phone_number_size);
  }

  output[phone_number_size] = '\0';
  return output;
}