#include "collatz_conjecture.h"

int steps(int start) {
  if (start <= 0) {
    return ERROR_VALUE;
  }

  int n = start;
  int res = 0;

  while (n != 1) {
    if ((n & 1) == 0) {
      n >>= 1;
    } else {
      if (n > (INT_MAX - 1) / 3) {
        return ERROR_VALUE;
      }
      n = 3 * n + 1;
      if (n < 0) {
        return ERROR_VALUE;
      }
    }
    res++;
  }

  return res;
}