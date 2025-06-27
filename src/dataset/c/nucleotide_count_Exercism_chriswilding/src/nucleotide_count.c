#include "nucleotide_count.h"

#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

static int width(int nucleotide)
{
  return floor(log10(nucleotide + 1)) + 4;
}

char *count(const char *dna_strand)
{
  size_t dna_strand_length = strlen(dna_strand);

  if (dna_strand_length == 0)
  {
    return strdup("A:0 C:0 G:0 T:0");
  }

  int a = 0;
  int c = 0;
  int g = 0;
  int t = 0;

  for (size_t i = 0; i < dna_strand_length; i++)
  {

    char ch = dna_strand[i];

    switch (ch)
    {
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
      return strdup("");
    }
  }

  int length = width(a) + width(c) + width(g) + width(t);
  char *output = (char *)malloc(length * sizeof(char));
  sprintf(output, "A:%d C:%d G:%d T:%d", a, c, g, t);
  return output;
}
