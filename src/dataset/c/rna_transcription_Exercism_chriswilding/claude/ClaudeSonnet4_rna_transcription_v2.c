#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna)
{
  int length = strlen(dna);
  char *complement = (char *)malloc(length + 1);
  if (!complement) return NULL;
  
  complement[length] = '\0';

  for (int i = 0; i < length; i++)
  {
    char c = dna[i];
    if (c == 'C') {
      complement[i] = 'G';
    } else if (c == 'G') {
      complement[i] = 'C';
    } else if (c == 'A') {
      complement[i] = 'U';
    } else if (c == 'T') {
      complement[i] = 'A';
    } else {
      free(complement);
      return NULL;
    }
  }

  return complement;
}