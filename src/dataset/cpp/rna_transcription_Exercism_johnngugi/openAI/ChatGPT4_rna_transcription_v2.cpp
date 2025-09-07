#include "rna_transcription.h"
#include <string>

namespace transcription
{
    char to_rna(char dna)
    {
        switch (dna)
        {
            case 'G': return 'C';
            case 'C': return 'G';
            case 'T': return 'A';
            case 'A': return 'U';
            default: return '\0'; // Handle invalid input gracefully
        }
    }

    std::string to_rna(const std::string& dna)
    {
        std::string result;
        result.reserve(dna.size()); // Reserve memory to avoid reallocations

        for (char c : dna)
        {
            result.push_back(to_rna(c));
        }

        return result;
    }
}