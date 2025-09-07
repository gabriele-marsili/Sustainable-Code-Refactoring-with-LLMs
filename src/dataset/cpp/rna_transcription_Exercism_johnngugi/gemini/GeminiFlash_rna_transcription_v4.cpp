#include "rna_transcription.h"
#include <algorithm>
#include <string>
#include <unordered_map>

using namespace std;

namespace transcription
{
    const std::unordered_map<char, char> rna = {
        {'G', 'C'},
        {'C', 'G'},
        {'T', 'A'},
        {'A', 'U'}
    };

    char to_rna(char dna)
    {
        auto it = rna.find(dna);
        return (it != rna.end()) ? it->second : '\0';
    }

    string to_rna(string dna)
    {
        string result;
        result.reserve(dna.length());

        for (char c : dna) {
            auto it = rna.find(c);
            result += (it != rna.end()) ? it->second : '\0';
        }

        return result;
    }
}