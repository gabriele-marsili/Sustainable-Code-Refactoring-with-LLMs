#include "phone_number.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

static void clean_invalid_number(char *input) {
  for (int i = 0; i < 10; ++i) {
    input[i] = '0';
  }
  input[10] = '\0';
}

char *phone_number_clean(const char *input) {
  char *result = (char *)calloc(11, sizeof(char));
  if (!result) return NULL;

  int j = 0;
  size_t len = strlen(input);
  for (size_t i = 0; i < len; ++i) {
    if (isdigit(input[i])) {
      result[j++] = input[i];
      if (j == 10) break;
    }
  }
  result[j] = '\0';

  if (strlen(result) != 10 || result[0] < '2' || result[3] < '2') {
    clean_invalid_number(result);
  }
  return result;
}