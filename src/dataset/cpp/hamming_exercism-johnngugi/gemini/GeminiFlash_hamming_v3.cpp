#include "hamming.h"
#include <string>
#include <stdexcept>

using namespace std;

int hamming::compute(string a, string b) {
  if (a.size() != b.size()) {
    throw domain_error("Error");
  }

  int distance = 0;
  size_t size = a.size();
  for (size_t i = 0; i < size; ++i) {
    if (a[i] != b[i]) {
      ++distance;
    }
  }
  return distance;
}