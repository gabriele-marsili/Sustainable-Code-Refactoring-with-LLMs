#include "nucleotide_count.h"
#include <stdlib.h>
#include <stdio.h>

char *count(const char *dna_strand) {
  if (dna_strand == NULL) {
    char *error = (char *)malloc(1);
    if (error) *error = '\0';
    return error;
  }

  int a = 0, c = 0, g = 0, t = 0;
  const char *tmp = dna_strand;

  while (*tmp) {
    switch (*tmp) {
      case 'A':
        a++;
        break;
      case 'C':
        c++;
        break;
      case 'G':
        g++;
        break;
      case 'T':
        t++;
        break;
      default: {
        char *error = (char *)malloc(1);
        if (error) *error = '\0';
        return error;
      }
    }
    tmp++;
  }

  int size = snprintf(NULL, 0, "A:%d C:%d G:%d T:%d", a, c, g, t);
  if (size < 0) {
      char *error = (char *)malloc(1);
      if (error) *error = '\0';
      return error;
  }

  char *res = (char *)malloc(size + 1);
  if (res == NULL) {
      char *error = (char *)malloc(1);
      if (error) *error = '\0';
      return error;
  }

  snprintf(res, size + 1, "A:%d C:%d G:%d T:%d", a, c, g, t);

  return res;
}