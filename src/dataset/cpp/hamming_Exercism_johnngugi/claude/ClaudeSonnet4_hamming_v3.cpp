#include "hamming.h"
#include <string>
#include <stdexcept>

int hamming::compute(const std::string& a, const std::string& b)
{
    if (a.size() != b.size())
        throw std::domain_error("Error");

    int distance = 0;
    const size_t size = a.size();
    
    for (size_t i = 0; i < size; ++i) {
        distance += (a[i] != b[i]);
    }
    
    return distance;
}