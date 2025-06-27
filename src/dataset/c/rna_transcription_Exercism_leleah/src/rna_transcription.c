#include "rna_transcription.h"

char *to_rna(const char *dna)
{char *rna = malloc(strlen(dna) + 1);
 char *current = rna;
   while(*dna)
   {
       switch (*dna)
    {
        case 'G': (*current)='C';break;
        case 'C': (*current)='G';break;
        case 'T': (*current)='A';break;
        case 'A': (*current)='U';break;
            
    }
       current++;
        dna++;
   }
    *current = '\0';
    return rna;  
}