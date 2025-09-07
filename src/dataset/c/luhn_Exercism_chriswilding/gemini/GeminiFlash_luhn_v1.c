#include "luhn.h"

#include <ctype.h>
#include <stdbool.h>
#include <string.h>

bool luhn(const char *number) {
  int sum = 0;
  int len = strlen(number);
  int n = 0;

  for (int i = len - 1; i >= 0; i--) {
    if (number[i] == ' ') {
      continue;
    }

    if (!isdigit(number[i])) {
      return false;
    }

    int digit = number[i] - '0';
    int value = digit;

    if (n % 2 != 0) {
      value *= 2;
      if (value > 9) {
        value -= 9;
      }
    }

    sum += value;
    n++;
  }

  return (n > 1) && (sum % 10 == 0);
}