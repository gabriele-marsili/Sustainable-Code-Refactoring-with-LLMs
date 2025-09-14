#include "nucleotide_count.h"
#include <stdexcept>
#include <algorithm>

using namespace dna;
using namespace std;

counter::counter(const string& a) : strand(a) {
    nucleotide_count['A'] = 0;
    nucleotide_count['C'] = 0;
    nucleotide_count['T'] = 0;
    nucleotide_count['G'] = 0;

    for (char nucleotide : a) {
        if (nucleotide_count.find(nucleotide) == nucleotide_count.end()) {
            if (nucleotide != 'A' && nucleotide != 'T' && nucleotide != 'G' && nucleotide != 'C') {
                throw std::invalid_argument("error");
            }
        }
        ++nucleotide_count[nucleotide];
    }
}

int counter::count(char letter) const {
    if (letter != 'A' && letter != 'T' && letter != 'G' && letter != 'C') {
        throw std::invalid_argument("error");
    }
    auto it = nucleotide_count.find(letter);
    if (it != nucleotide_count.end()) {
        return it->second;
    }
    return 0;
}

map<char, int> counter::nucleotide_counts() const {
    return nucleotide_count;
}