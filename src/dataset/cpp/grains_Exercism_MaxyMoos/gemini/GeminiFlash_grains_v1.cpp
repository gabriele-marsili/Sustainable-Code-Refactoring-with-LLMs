#include "grains.h"

ull grains::square(int index) {
  if (index <= 0 || index > 64) {
    throw std::domain_error("Invalid index. Index must be between 1 and 64.");
  }
  return static_cast<ull>(1) << (index - 1);
}

ull grains::total() {
  return std::numeric_limits<ull>::max();
}