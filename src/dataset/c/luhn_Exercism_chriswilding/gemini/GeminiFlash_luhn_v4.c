#include "luhn.h"

#include <ctype.h>
#include <stdbool.h>
#include <string.h>

bool luhn(const char *number) {
  int sum = 0;
  int n = 0;
  int len = strlen(number);

  for (int i = len - 1; i >= 0; i--) {
    char c = number[i];

    if (c == ' ') {
      continue;
    }

    if (!isdigit(c)) {
      return false;
    }

    int digit = c - '0';
    if (n % 2 == 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    n++;
  }

  return (n > 1) && (sum % 10 == 0);
}