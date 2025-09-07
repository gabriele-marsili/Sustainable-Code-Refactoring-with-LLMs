#include "rna_transcription.h"

char *to_rna(const char *dna)
{
    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    char *current = rna;
    
    while(*dna)
    {
        switch (*dna)
        {
            case 'G': *current = 'C'; break;
            case 'C': *current = 'G'; break;
            case 'T': *current = 'A'; break;
            case 'A': *current = 'U'; break;
        }
        current++;
        dna++;
    }
    *current = '\0';
    return rna;  
}