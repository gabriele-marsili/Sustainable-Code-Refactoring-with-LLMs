#include "binary.h"
#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

int pow(int exponent) {
  if (exponent < 0) return 0;
  if (exponent == 0) return 1;
  if (exponent == 1) return 2;

  int result = 1;
  int base = 2;
  while (exponent > 0) {
    if (exponent % 2 == 1) {
      result *= base;
    }
    base *= base;
    exponent /= 2;
  }
  return result;
}


int binary::convert(string input) {
  int result = 0;
  int size = input.length();

  for (int i = 0; i < size; ++i) {
    char c = input[i];
    if (c != '0' && c != '1') {
      return 0;
    }
    result = (result << 1) | (c - '0');
  }

  return result;
}