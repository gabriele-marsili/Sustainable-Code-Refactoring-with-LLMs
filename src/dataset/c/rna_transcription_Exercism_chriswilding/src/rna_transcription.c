#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna)
{
  int length = strlen(dna);
  char *complement = (char *)malloc(length + 1 * sizeof(char));
  complement[length] = '\0';

  for (int i = 0; i < length; i++)
  {
    char c = dna[i];
    switch (c)
    {
    case 'C':
      complement[i] = 'G';
      break;
    case 'G':
      complement[i] = 'C';
      break;
    case 'A':
      complement[i] = 'U';
      break;
    case 'T':
      complement[i] = 'A';
      break;
    default:
      return NULL;
    }
  }

  return complement;
}
