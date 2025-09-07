#include "hamming.h"
#include <string>
#include <stdexcept>
#include <algorithm>
using namespace std;

int hamming::compute(const string& a, const string& b)
{
    if (a.size() != b.size())
        throw domain_error("Error");

    return count_if(a.begin(), a.end(), [&, it = b.begin()](char c) mutable {
        return c != *it++;
    });
}