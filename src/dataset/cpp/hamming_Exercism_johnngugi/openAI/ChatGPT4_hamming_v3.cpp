#include "hamming.h"
#include <string>
#include <stdexcept>
using namespace std;

int hamming::compute(const string& a, const string& b)
{
    if (a.size() != b.size())
        throw domain_error("Error");

    int distance = 0;
    for (size_t i = 0; i < a.size(); ++i) {
        distance += (a[i] != b[i]);
    }
    return distance;
}