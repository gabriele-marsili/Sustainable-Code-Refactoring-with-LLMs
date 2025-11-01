#include "hamming.h"
#include <string>
#include <stdexcept>
using namespace std;

int hamming::compute(const string& a, const string& b)
{
    if (a.size() != b.size())
        throw domain_error("Error");

    int count = 0;
    for (size_t i = 0; i < a.size(); ++i) {
        if (a[i] != b[i]) {
            ++count;
        }
    }
    return count;
}