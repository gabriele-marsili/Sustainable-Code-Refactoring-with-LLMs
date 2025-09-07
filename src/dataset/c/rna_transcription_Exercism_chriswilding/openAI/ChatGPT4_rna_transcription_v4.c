#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna)
{
    if (!dna) return NULL;

    size_t length = strlen(dna);
    char *complement = (char *)malloc((length + 1) * sizeof(char));
    if (!complement) return NULL;

    for (size_t i = 0; i < length; i++)
    {
        switch (dna[i])
        {
        case 'C': complement[i] = 'G'; break;
        case 'G': complement[i] = 'C'; break;
        case 'A': complement[i] = 'U'; break;
        case 'T': complement[i] = 'A'; break;
        default:
            free(complement);
            return NULL;
        }
    }

    complement[length] = '\0';
    return complement;
}