#include "rna_transcription.h"
#include <string>
#include <stdexcept>

using namespace std;

namespace transcription
{
    char to_rna(char dna)
    {
        switch (dna) {
            case 'G': return 'C';
            case 'C': return 'G';
            case 'T': return 'A';
            case 'A': return 'U';
            default: throw std::invalid_argument("Invalid DNA nucleotide");
        }
    }

    string to_rna(string dna)
    {
        string result;
        result.reserve(dna.length());

        for (char c : dna) {
            switch (c) {
                case 'G': result += 'C'; break;
                case 'C': result += 'G'; break;
                case 'T': result += 'A'; break;
                case 'A': result += 'U'; break;
                default: throw std::invalid_argument("Invalid DNA nucleotide");
            }
        }

        return result;
    }
}