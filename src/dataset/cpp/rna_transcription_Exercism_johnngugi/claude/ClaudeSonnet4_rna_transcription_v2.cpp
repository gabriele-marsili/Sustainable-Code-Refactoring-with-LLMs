#include "rna_transcription.h"
#include <algorithm>

using namespace std;

namespace transcription
{
    constexpr char to_rna_lookup(char dna) noexcept
    {
        switch(dna) {
            case 'G': return 'C';
            case 'C': return 'G';
            case 'T': return 'A';
            case 'A': return 'U';
            default: return dna;
        }
    }

    char to_rna(char dna)
    {
        return to_rna_lookup(dna);
    }

    string to_rna(string dna)
    {
        string result;
        result.reserve(dna.size());

        transform(dna.begin(), dna.end(), back_inserter(result), to_rna_lookup);

        return result;
    }
}