#include "collatz_conjecture.h"

int steps(int start) {
  if (start <= 0) {
    return ERROR_VALUE;
  }

  if (start == 1) {
    return 0;
  }

  int step_count = 0;
  while (start > 1) {
    if ((start & 1) == 0) { // Check if even using bitwise AND
      start >>= 1;          // Divide by 2 using right bit shift
    } else {
      if (start > (INT_MAX - 1) / 3) return ERROR_VALUE; // Check for potential overflow before multiplication
      start = (start * 3) + 1;
    }
    step_count++;
  }
  return step_count;
}