#include "rna_transcription.h"

#include <stdlib.h>

char *to_rna(const char *dna)
{
  if (!dna) return NULL;

  char *complement = (char *)malloc(strlen(dna) + 1);
  if (!complement) return NULL;

  char *ptr = complement;
  while (*dna)
  {
    switch (*dna)
    {
    case 'C':
      *ptr++ = 'G';
      break;
    case 'G':
      *ptr++ = 'C';
      break;
    case 'A':
      *ptr++ = 'U';
      break;
    case 'T':
      *ptr++ = 'A';
      break;
    default:
      free(complement);
      return NULL;
    }
    dna++;
  }
  *ptr = '\0';

  return complement;
}