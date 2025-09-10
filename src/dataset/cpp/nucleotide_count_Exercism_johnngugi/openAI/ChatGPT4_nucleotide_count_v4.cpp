#include "nucleotide_count.h"
#include <stdexcept>
#include <array>
using namespace dna;
using namespace std;

bool counter::check_valid_char(char letter) const
{
    static const array<char, 4> valid = {'A', 'T', 'G', 'C'};
    for (char c : valid)
    {
        if (letter == c)
            return true;
    }
    throw std::invalid_argument("error");
}

counter::counter(const string& a) : strand(a), nucleotide_count{{'A', 0}, {'C', 0}, {'T', 0}, {'G', 0}}
{
    for (char c : a)
    {
        check_valid_char(c);
        ++nucleotide_count[c];
    }
}

int counter::count(char letter) const
{
    check_valid_char(letter);
    return nucleotide_count.at(letter);
}

map<char, int> counter::nucleotide_counts() const
{
    return nucleotide_count;
}