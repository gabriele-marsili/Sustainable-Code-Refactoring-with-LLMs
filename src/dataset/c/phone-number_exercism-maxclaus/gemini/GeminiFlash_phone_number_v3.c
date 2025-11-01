#include "phone_number.h"
#include <ctype.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  return phone_number_clean_v2(input);
}

char *phone_number_clean_v2(const char *input) {
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

      if ((output_size == 0 || output_size == 3) && (*p == '0' || *p == '1')) {
        strcpy(output, "0000000000");
        return output;
      }

      if (output_size >= phone_number_size) {
        strcpy(output, "0000000000");
        return output;
      }

      output[output_size++] = *p;
    }
    p++;
  }

  if (output_size != phone_number_size) {
    strcpy(output, "0000000000");
  }

  return output;
}

char *phone_number_clean_v1(const char *input) {
  const int phone_number_size = 10;
  char *output = malloc(phone_number_size + 1);
  if (output == NULL) {
    return NULL;
  }

  int output_size = 0;
  bool is_valid = true;
  const char *p = input;

  while (*p != '\0') {
    char c = *p;

    if (!isdigit(c)) {
      p++;
      continue;
    }

    if (output_size == 0 && c == '1') {
      p++;
      continue;
    }

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
    p++;
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