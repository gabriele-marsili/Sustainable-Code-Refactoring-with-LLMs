#include "nucleotide_count.h"
#include <stdexcept>
#include <array>
using namespace dna;
using namespace std;

class counter {
private:
    string strand;
    array<int, 4> nucleotide_count = {0, 0, 0, 0}; // A, C, G, T

    inline int get_index(char letter) const {
        switch (letter) {
            case 'A': return 0;
            case 'C': return 1;
            case 'G': return 2;
            case 'T': return 3;
            default: throw std::invalid_argument("Invalid nucleotide");
        }
    }

public:
    counter(string a) : strand(move(a)) {
        for (char c : strand) {
            nucleotide_count[get_index(c)]++;
        }
    }

    int count(char letter) const {
        return nucleotide_count[get_index(letter)];
    }

    map<char, int> nucleotide_counts() const {
        return {{'A', nucleotide_count[0]}, {'C', nucleotide_count[1]}, {'G', nucleotide_count[2]}, {'T', nucleotide_count[3]}};
    }
};