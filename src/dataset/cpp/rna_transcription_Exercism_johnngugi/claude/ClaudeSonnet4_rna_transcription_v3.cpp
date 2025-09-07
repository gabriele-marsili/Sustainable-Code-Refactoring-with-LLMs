#include "rna_transcription.h"
#include <algorithm>

using namespace std;

namespace transcription
{
    constexpr char rna_lookup[256] = {
        ['G'] = 'C',
        ['C'] = 'G', 
        ['T'] = 'A',
        ['A'] = 'U'
    };

    char to_rna(char dna)
    {
        return rna_lookup[static_cast<unsigned char>(dna)];
    }

    string to_rna(string dna)
    {
        string result;
        result.reserve(dna.size());
        
        for (char c : dna) {
            result += rna_lookup[static_cast<unsigned char>(c)];
        }
        
        return result;
    }
}