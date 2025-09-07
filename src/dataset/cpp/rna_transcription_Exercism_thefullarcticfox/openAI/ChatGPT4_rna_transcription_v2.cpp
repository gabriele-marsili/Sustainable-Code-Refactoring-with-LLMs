#include "rna_transcription.h"
#include <unordered_map>

namespace rna_transcription {
    char to_rna(char c) {
        static const std::unordered_map<char, char> rna_map = {
            {'G', 'C'}, {'C', 'G'}, {'T', 'A'}, {'A', 'U'}
        };
        auto it = rna_map.find(c);
        return it != rna_map.end() ? it->second : c;
    }

    std::string to_rna(const std::string& s) {
        std::string res;
        res.reserve(s.size());
        for (char c : s) {
            res.push_back(to_rna(c));
        }
        return res;
    }
}  // namespace rna_transcription