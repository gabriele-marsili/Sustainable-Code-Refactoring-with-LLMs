#ifndef PROTEIN_TRANSLATION_H
#define PROTEIN_TRANSLATION_H

#include <stdbool.h>
#include <stddef.h>
#include <string.h>

#define MAX_PROTEINS 50
#define MAX_CODONS_PER_PROTEIN 10
#define ARRAY_SIZE(x) sizeof(x) / sizeof(x[0])

typedef enum {
    Methionine,
    Phenylalanine,
    Leucine,
    Serine,
    Tyrosine,
    Cysteine,
    Tryptophan,
    Stop
} protein_t;

typedef struct {
    protein_t protein;
    char *codons[MAX_CODONS_PER_PROTEIN];
} codon_protein_t;

typedef struct {
    bool valid;
    size_t count;
    protein_t proteins[MAX_PROTEINS];
} proteins_t;

int translate(proteins_t *data, codon_protein_t *map, const char *rna);
proteins_t proteins(const char *const rna);

#endif
