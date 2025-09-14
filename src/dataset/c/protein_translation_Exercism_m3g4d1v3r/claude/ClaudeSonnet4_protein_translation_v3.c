#include "protein_translation.h"
#include <string.h>

static const char* const codon_map[64] = {
    [0] = NULL, [1] = NULL, [2] = NULL, [3] = NULL,
    [4] = NULL, [5] = NULL, [6] = NULL, [7] = NULL,
    [8] = NULL, [9] = NULL, [10] = NULL, [11] = NULL,
    [12] = NULL, [13] = NULL, [14] = NULL, [15] = NULL,
    [16] = NULL, [17] = NULL, [18] = NULL, [19] = NULL,
    [20] = NULL, [21] = NULL, [22] = NULL, [23] = NULL,
    [24] = NULL, [25] = NULL, [26] = NULL, [27] = NULL,
    [28] = NULL, [29] = NULL, [30] = NULL, [31] = NULL,
    [32] = NULL, [33] = NULL, [34] = NULL, [35] = NULL,
    [36] = NULL, [37] = NULL, [38] = NULL, [39] = NULL,
    [40] = NULL, [41] = NULL, [42] = NULL, [43] = NULL,
    [44] = NULL, [45] = NULL, [46] = NULL, [47] = NULL,
    [48] = NULL, [49] = NULL, [50] = NULL, [51] = NULL,
    [52] = NULL, [53] = NULL, [54] = NULL, [55] = NULL,
    [56] = NULL, [57] = NULL, [58] = NULL, [59] = NULL,
    [60] = NULL, [61] = NULL, [62] = NULL, [63] = NULL
};

static const protein_t codon_to_protein[64] = {
    [0] = -1, [1] = -1, [2] = -1, [3] = -1,
    [4] = -1, [5] = -1, [6] = -1, [7] = -1,
    [8] = -1, [9] = -1, [10] = -1, [11] = -1,
    [12] = -1, [13] = -1, [14] = -1, [15] = -1,
    [16] = -1, [17] = -1, [18] = -1, [19] = -1,
    [20] = -1, [21] = -1, [22] = -1, [23] = -1,
    [24] = -1, [25] = -1, [26] = -1, [27] = -1,
    [28] = -1, [29] = -1, [30] = -1, [31] = -1,
    [32] = -1, [33] = -1, [34] = -1, [35] = -1,
    [36] = -1, [37] = -1, [38] = -1, [39] = -1,
    [40] = -1, [41] = -1, [42] = -1, [43] = -1,
    [44] = -1, [45] = -1, [46] = -1, [47] = -1,
    [48] = -1, [49] = -1, [50] = -1, [51] = -1,
    [52] = -1, [53] = -1, [54] = -1, [55] = -1,
    [56] = -1, [57] = -1, [58] = -1, [59] = -1,
    [60] = -1, [61] = -1, [62] = -1, [63] = -1
};

static int codon_hash(const char *codon) {
    int hash = 0;
    for (int i = 0; i < 3; i++) {
        switch (codon[i]) {
            case 'A': hash = hash * 4 + 0; break;
            case 'U': hash = hash * 4 + 1; break;
            case 'G': hash = hash * 4 + 2; break;
            case 'C': hash = hash * 4 + 3; break;
            default: return -1;
        }
    }
    return hash;
}

static void init_codon_map(void) {
    static int initialized = 0;
    if (initialized) return;
    
    const char* codons[][MAX_CODONS_PER_PROTEIN] = {
        {"AUG", ""},
        {"UUU", "UUC", ""},
        {"UUA", "UUG", ""},
        {"UCU", "UCC", "UCA", "UCG", ""},
        {"UAU", "UAC", ""},
        {"UGU", "UGC", ""},
        {"UGG", ""},
        {"UAA", "UAG", "UGA", ""}
    };
    
    for (protein_t prot = 0; prot <= Stop; prot++) {
        for (size_t idx = 0; idx < MAX_CODONS_PER_PROTEIN && codons[prot][idx][0]; idx++) {
            int hash = codon_hash(codons[prot][idx]);
            if (hash >= 0 && hash < 64) {
                codon_to_protein[hash] = prot;
            }
        }
    }
    initialized = 1;
}

int translate(proteins_t *data, codon_protein_t *map, const char *rna) {
    if (*rna == '\0') {
        data->valid = true;
        return (-1);
    }
    if (*(rna + 1) == '\0' || *(rna + 2) == '\0') {
        data->valid = false;
        return (-1);
    }

    init_codon_map();
    
    int hash = codon_hash(rna);
    if (hash < 0 || hash >= 64) {
        data->valid = false;
        return (-1);
    }
    
    protein_t prot = codon_to_protein[hash];
    if (prot == -1) {
        data->valid = false;
        return (-1);
    }
    
    if (prot == Stop) {
        data->valid = true;
        return (0);
    }
    
    data->proteins[data->count++] = prot;
    data->proteins[data->count] = '\0';
    return (0);
}

proteins_t proteins(const char *const rna) {
    proteins_t data = {0};
    codon_protein_t map[] = {{Methionine, {"AUG", ""}},
                             {Phenylalanine, {"UUU", "UUC", ""}},
                             {Leucine, {"UUA", "UUG", ""}},
                             {Serine, {"UCU", "UCC", "UCA", "UCG", ""}},
                             {Tyrosine, {"UAU", "UAC", ""}},
                             {Cysteine, {"UGU", "UGC", ""}},
                             {Tryptophan, {"UGG", ""}},
                             {Stop, {"UAA", "UAG", "UGA", ""}}};

    const char *rna_ptr = rna;
    while (translate(&data, map, rna_ptr) == 0 && !data.valid) {
        rna_ptr += 3;
    }
    return data;
}