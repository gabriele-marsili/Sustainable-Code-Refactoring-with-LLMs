#include "phone_number.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *phone_number_clean(const char *input) {
  const int phone_number_size = 10;
  char *output = calloc(11, sizeof(char));
  
  if (!output || !input) {
    if (output) {
      memset(output, '0', phone_number_size);
    }
    return output;
  }

  int output_size = 0;
  const char *ptr = input;
  
  while (*ptr && output_size <= phone_number_size) {
    if (isdigit(*ptr)) {
      if (output_size == 0 && *ptr == '1') {
        ptr++;
        continue;
      }
      
      if ((output_size == 0 || output_size == 3) && (*ptr < '2')) {
        memset(output, '0', phone_number_size);
        return output;
      }
      
      if (output_size >= phone_number_size) {
        memset(output, '0', phone_number_size);
        return output;
      }
      
      output[output_size++] = *ptr;
    }
    ptr++;
  }
  
  if (output_size != phone_number_size) {
    memset(output, '0', phone_number_size);
  }
  
  return output;
}

char *phone_number_clean_v2(const char *input) {
  const int phone_number_size = 10;
  const int len = strlen(input);

  char *output = calloc(phone_number_size, sizeof(char));
  int output_size = 0;
  char c;

  for (int i = 0; i < len; i++) {
    c = input[i];

    if (!isdigit(c)) {
      continue;
    }

    if (output_size == 0 && c == '1') {
      continue;
    }

    if ((output_size == 0 || output_size == 3) && (c == '0' || c == '1')) {
      break;
    }

    if (output_size > phone_number_size - 1) {
      output_size += 1;
      break;
    }

    output[output_size] = c;
    output_size += 1;
  }

  if (output_size != phone_number_size) {
    strcpy(output, "0000000000");
  }

  return output;
}

char *phone_number_clean_v1(const char *input) {
  const int phone_number_size = 10;
  const int len = strlen(input);

  char *output = (char *)malloc(sizeof(char) * phone_number_size);
  if (output == NULL) {
    return NULL;
  }

  int output_size = 0;
  bool is_valid = true;

  for (int i = 0; i < len; i++) {
    char c = input[i];

    if (!isdigit(c)) {
      continue;
    }

    if (output_size == 0 && c == '1') {
      continue;
    }

    if (output_size == 0 || output_size == 3) {
      int n = c - '0';
      if (n < 2) {
        is_valid = false;
        break;
      }
    }

    if (output_size > phone_number_size - 1) {
      is_valid = false;
      break;
    }

    output[output_size] = c;
    output_size += 1;
  }

  if (output_size != phone_number_size) {
    is_valid = false;
  }

  if (!is_valid) {
    for (int i = 0; i < phone_number_size; i++) {
      output[i] = '0';
    }
  }

  output[phone_number_size] = '\0';

  return output;
}