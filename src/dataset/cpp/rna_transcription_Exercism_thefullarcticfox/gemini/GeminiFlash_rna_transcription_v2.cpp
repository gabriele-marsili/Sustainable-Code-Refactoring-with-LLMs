#include "rna_transcription.h"
#include <algorithm>

namespace rna_transcription {

char to_rna(char c) {
    switch (c) {
        case 'G': return 'C';
        case 'C': return 'G';
        case 'T': return 'A';
        case 'A': return 'U';
        default: return c; // Or throw an exception for invalid input
    }
}

std::string to_rna(const std::string& s) {
    std::string res = s;
    std::transform(res.begin(), res.end(), res.begin(), to_rna);
    return res;
}

}  // namespace rna_transcription