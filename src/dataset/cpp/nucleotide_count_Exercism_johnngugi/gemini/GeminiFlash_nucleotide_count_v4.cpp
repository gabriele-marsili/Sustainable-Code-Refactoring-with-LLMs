#include "nucleotide_count.h"
#include <stdexcept>
#include <algorithm>

using namespace dna;
using namespace std;

counter::counter(const string& a) : strand(a) {
    nucleotide_count['A'] = 0;
    nucleotide_count['C'] = 0;
    nucleotide_count['G'] = 0;
    nucleotide_count['T'] = 0;

    for (char c : a) {
        switch (c) {
            case 'A':
                nucleotide_count['A']++;
                break;
            case 'C':
                nucleotide_count['C']++;
                break;
            case 'G':
                nucleotide_count['G']++;
                break;
            case 'T':
                nucleotide_count['T']++;
                break;
            default:
                throw std::invalid_argument("Invalid nucleotide: " + string(1, c));
        }
    }
}

int counter::count(char letter) const {
    if (letter != 'A' && letter != 'C' && letter != 'G' && letter != 'T') {
        throw std::invalid_argument("Invalid nucleotide: " + string(1, letter));
    }
    return nucleotide_count.at(letter);
}

map<char, int> counter::nucleotide_counts() const {
    return nucleotide_count;
}