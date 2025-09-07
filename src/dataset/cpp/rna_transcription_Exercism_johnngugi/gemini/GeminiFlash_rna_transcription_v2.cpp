#include "rna_transcription.h"
#include <string>
#include <unordered_map>

using namespace std;

namespace transcription
{
    const unordered_map<char, char> rna = {
        {'G', 'C'},
        {'C', 'G'},
        {'T', 'A'},
        {'A', 'U'}
    };

    char to_rna(char dna)
    {
        auto it = rna.find(dna);
        if (it != rna.end()) {
            return it->second;
        }
        return '\0'; // Or throw an exception, depending on desired behavior for invalid input
    }

    string to_rna(string dna)
    {
        string result(dna.length(), '\0');
        for (size_t i = 0; i < dna.length(); ++i) {
            auto it = rna.find(dna[i]);
            if (it != rna.end()) {
                result[i] = it->second;
            } else {
                return ""; // Or throw an exception, depending on desired behavior for invalid input
            }
        }
        return result;
    }
}