#include "grains.h"
#include <stdexcept>

ull grains::square(int index) {
  if (index <= 0 || index > 64) {
    throw std::domain_error("Invalid index. Index must be between 1 and 64.");
  }
  return (ull)1 << (index - 1);
}

ull grains::total() {
  return ((ull)1 << 64) - 1;
}