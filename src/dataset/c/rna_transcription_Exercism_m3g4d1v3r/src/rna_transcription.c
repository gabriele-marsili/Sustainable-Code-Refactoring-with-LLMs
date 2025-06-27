#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

// the caller is responsible for freeing up
// the returned pointer
char *to_rna(const char *dna) {
    // +1 is necessary to prevent heap bufferoverflow
    int dna_array_size = strlen(dna) + 1;
    char *rna = malloc(sizeof(char) * dna_array_size);
    if (rna == NULL) return (NULL);
    while (*dna != '\0') {
        switch (*dna++) {
            case 'G':
                *rna++ = 'C';
                break;
            case 'C':
                *rna++ = 'G';
                break;
            case 'T':
                *rna++ = 'A';
                break;
            case 'A':
                *rna++ = 'U';
                break;
            default:
                return (NULL);
        }
    }
    *rna++ = '\0';
    return (rna - dna_array_size);
}
