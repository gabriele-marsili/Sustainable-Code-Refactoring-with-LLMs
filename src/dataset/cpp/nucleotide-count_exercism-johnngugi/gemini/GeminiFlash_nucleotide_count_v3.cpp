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

    for (char c : a) {
        if (c != 'A' && c != 'T' && c != 'G' && c != 'C') {
            throw std::invalid_argument("error");
        }
        ++nucleotide_count[c];
    }
}

int counter::count(char letter) const {
    if (letter != 'A' && letter != 'T' && letter != 'G' && letter != 'C') {
        throw std::invalid_argument("error");
    }
    return nucleotide_count.at(letter);
}

map<char, int> counter::nucleotide_counts() const {
    return nucleotide_count;
}