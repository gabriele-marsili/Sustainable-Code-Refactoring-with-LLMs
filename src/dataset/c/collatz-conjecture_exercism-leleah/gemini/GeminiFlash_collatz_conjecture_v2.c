#include "collatz_conjecture.h"

int steps(int start) {
  if (start <= 0) {
    return ERROR_VALUE;
  }

  int steps_count = 0;
  unsigned int n = (unsigned int)start; 

  while (n != 1) {
    if ((n & 1) == 0) { 
      n >>= 1;       
    } else {
      n = 3 * n + 1;
    }
    steps_count++;
  }
  return steps_count;
}