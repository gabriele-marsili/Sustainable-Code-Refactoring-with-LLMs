#include "collatz_conjecture.h"

int steps(int start) {
  if (start <= 0) {
    return ERROR_VALUE;
  }

  int res = 0;
  unsigned int n = (unsigned int)start; // Use unsigned int to avoid potential overflow
  while (n != 1) {
    if ((n & 1) == 0) { // Use bitwise AND for even check, faster than division
      n >>= 1;          // Use right bit shift for division by 2
    } else {
      if (n > (UINT_MAX - 1) / 3) { // Check for potential overflow before multiplication
        return ERROR_VALUE;          // Or handle overflow in a more appropriate way
      }
      n = 3 * n + 1;
    }
    res++;
  }
  return res;
}