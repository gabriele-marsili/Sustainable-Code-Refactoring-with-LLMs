#include "rna_transcription.h"
#include <algorithm>
#include <unordered_map>

namespace rna_transcription {

char to_rna(char c) {
    static const std::unordered_map<char, char> dna_to_rna = {
        {'G', 'C'},
        {'C', 'G'},
        {'T', 'A'},
        {'A', 'U'}
    };

    auto it = dna_to_rna.find(c);
    if (it != dna_to_rna.end()) {
        return it->second;
    }
    return c;
}

std::string to_rna(const std::string& s) {
    std::string res = s;
    std::transform(res.begin(), res.end(), res.begin(), to_rna);
    return res;
}

}  // namespace rna_transcription