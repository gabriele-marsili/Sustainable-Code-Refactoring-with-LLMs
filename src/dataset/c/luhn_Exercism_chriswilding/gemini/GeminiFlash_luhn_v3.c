#include "luhn.h"

#include <ctype.h>
#include <stdbool.h>

bool luhn(const char *number) {
  int sum = 0;
  int n = 0;
  int len = 0;

  // Calculate length efficiently, skipping spaces
  for (const char *p = number; *p != '\0'; ++p) {
    if (*p != ' ') {
      len++;
    }
  }

  if (len <= 1) {
    return false;
  }

  // Process digits from right to left
  for (const char *p = number + strlen(number) - 1; p >= number; --p) {
    if (*p == ' ') {
      continue;
    }

    if (!isdigit(*p)) {
      return false;
    }

    int value = *p - '0';

    if (n % 2 == 1) {
      value *= 2;
      if (value > 9) {
        value -= 9;
      }
    }

    sum += value;
    n++;
  }

  return sum % 10 == 0;
}