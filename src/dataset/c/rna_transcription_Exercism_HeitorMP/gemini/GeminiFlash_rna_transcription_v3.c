#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna) {
  if (dna == NULL) {
    return NULL;
  }

  size_t dna_len = strlen(dna);
  char *rna = malloc(sizeof(char) * (dna_len + 1));

  if (rna == NULL) {
    return NULL; // Handle memory allocation failure
  }

  for (size_t i = 0; i < dna_len; i++) {
    switch (dna[i]) {
    case 'G':
      rna[i] = 'C';
      break;
    case 'C':
      rna[i] = 'G';
      break;
    case 'T':
      rna[i] = 'A';
      break;
    case 'A':
      rna[i] = 'U';
      break;
    default:
      free(rna);
      return NULL; // Handle invalid input
    }
  }

  rna[dna_len] = '\0';
  return rna;
}