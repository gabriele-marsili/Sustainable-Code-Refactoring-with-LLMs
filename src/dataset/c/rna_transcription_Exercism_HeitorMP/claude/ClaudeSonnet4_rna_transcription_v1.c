#include "rna_transcription.h"

char *to_rna(const char *dna)
{
    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    
    for (size_t i = 0; i < len; i++)
    {
        switch (dna[i])
        {
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
            rna[i] = dna[i];
            break;
        }
    }
    rna[len] = '\0';
    return rna;
}