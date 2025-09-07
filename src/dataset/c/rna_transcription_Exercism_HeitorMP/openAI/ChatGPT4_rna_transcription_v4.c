#include "rna_transcription.h"

char *to_rna(const char *dna)
{
    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    if (!rna) return NULL;

    for (size_t i = 0; i < len; i++)
    {
        char nucleotide = dna[i];
        rna[i] = (nucleotide == 'G') ? 'C' :
                 (nucleotide == 'C') ? 'G' :
                 (nucleotide == 'T') ? 'A' :
                 (nucleotide == 'A') ? 'U' : '\0';
    }
    rna[len] = '\0';
    return rna;
}