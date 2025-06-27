#include "nucleotide_count.h"

size_t count_digits(size_t input) {
    if (input == 0) return 1;
    return log10(input) + 1;
}

char *count(const char *dna_strand) {
    occurrence_map_t map = {0, 0, 0, 0};
    size_t result_len;
    char *result, nucleotide;

    while (*dna_strand != '\0') {
        nucleotide = *dna_strand;
        switch (nucleotide) {
            case 'A':
                map.A++;
                break;
            case 'C':
                map.C++;
                break;
            case 'G':
                map.G++;
                break;
            case 'T':
                map.T++;
                break;
            default:
                result = malloc(sizeof(char) * 1);
                *result = '\0';
                return (result);
        }
        dna_strand++;
    }
    result_len = strlen("A: C: G: T:");
    result_len += count_digits(map.A);
    result_len += count_digits(map.C);
    result_len += count_digits(map.G);
    result_len += count_digits(map.T);
    result = malloc(sizeof(char) * (result_len + 1));
    sprintf(result, "A:%zu C:%zu G:%zu T:%zu", map.A, map.C, map.G, map.T);
    return (result);
}
