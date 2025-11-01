#include "hamming.h"
#include <string>
#include <stdexcept>

using namespace std;

int hamming::compute(string a, string b) {
  if (a.size() != b.size()) {
    throw domain_error("Error");
  }

  int distance = 0;
  for (size_t i = 0; i < a.size(); ++i) {
    if (a[i] != b[i]) {
      ++distance;
    }
  }
  return distance;
}