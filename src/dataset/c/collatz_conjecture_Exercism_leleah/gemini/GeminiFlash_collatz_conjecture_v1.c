#include "collatz_conjecture.h"

int steps(int start) {
  if (start <= 0) {
    return ERROR_VALUE;
  }

  int step_count = 0;
  unsigned int n = static_cast<unsigned int>(start); 

  while (n != 1) {
    if ((n & 1) == 0) { 
      n >>= 1;       
    } else {
      n = 3 * n + 1;
    }
    step_count++;
  }

  return step_count;
}