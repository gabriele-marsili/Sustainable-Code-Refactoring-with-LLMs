#include "nucleotide_count.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char *count(const char *dna_strand) {
  if (dna_strand == NULL) {
    char *error = (char *)malloc(1);
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
      char *error = (char *)malloc(1);
      if (error != NULL) {
        *error = '\0';
      }
      return error;
    }
    tmp++;
  }

  char *res = (char *)malloc(20); 
  if (res == NULL) {
      char *error = (char *)malloc(1);
      if(error != NULL){
          *error = '\0';
      }
      return error;
  }

  int size = snprintf(res, 20, "A:%d C:%d G:%d T:%d", a, c, g, t);

  if (size >= 20) {
    free(res);
    res = (char *)malloc(size + 1);
    if (res == NULL) {
        char *error = (char *)malloc(1);
        if(error != NULL){
            *error = '\0';
        }
        return error;
    }
    snprintf(res, size + 1, "A:%d C:%d G:%d T:%d", a, c, g, t);
  }

  return res;
}