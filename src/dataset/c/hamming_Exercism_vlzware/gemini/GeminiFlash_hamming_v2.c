#include "hamming.h"
#include <stddef.h>

int compute(const char *dna_a, const char *dna_b) {
  if (dna_a == NULL || dna_b == NULL) {
    return -1;
  }

  int diff = 0;
  size_t i = 0;

  while (dna_a[i] != '\0' && dna_b[i] != '\0') {
    if (dna_a[i] != dna_b[i]) {
      diff++;
    }
    i++;
  }

  if (dna_a[i] != '\0' || dna_b[i] != '\0') {
    return -1;
  }

  return diff;
}