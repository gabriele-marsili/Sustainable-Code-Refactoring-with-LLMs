#include "rna_transcription.h"
#include <unordered_map>

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
        return it != rna.end() ? it->second : '\0';
    }

    std::string to_rna(const std::string& dna)
    {
        std::string result;
        result.reserve(dna.size());

        for (char c : dna)
        {
            auto it = rna.find(c);
            if (it != rna.end())
            {
                result.push_back(it->second);
            }
        }

        return result;
    }
}