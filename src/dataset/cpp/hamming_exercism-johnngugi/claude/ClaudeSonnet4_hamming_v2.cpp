#include "hamming.h"
#include <string>
#include <stdexcept>
using namespace std;

int hamming::compute(const string& a, const string& b)
{
    if (a.size() != b.size())
        throw domain_error("Error");

    int count = 0;
    const size_t size = a.size();
    for (size_t i = 0; i < size; ++i) {
        if (a[i] != b[i]) {
            ++count;
        }
    }
    return count;
}