#include "nucleotide_count.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char *count(const char *dna_strand) {
  if (dna_strand == NULL) {
    char *error = malloc(1);
    if (error != NULL) {
      *error = '\0';
    }
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
      default:
        char *error = malloc(1);
        if (error != NULL) {
          *error = '\0';
        }
        return error;
    }
    tmp++;
  }

  char *res = malloc(30); // Allocate enough space for "A:x C:x G:x T:x\0" where x is up to 9
  if (res == NULL) {
      char *error = malloc(1);
      if(error != NULL){
          *error = '\0';
      }
      return error;
  }

  snprintf(res, 30, "A:%d C:%d G:%d T:%d", a, c, g, t);

  return res;
}