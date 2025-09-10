#include "binary_search.h"
#include <stdexcept>

namespace binary_search {
    size_t find(const std::vector<int>& data, int value) {
        if (data.empty())
            throw std::domain_error("empty vector");

        size_t left = 0, right = data.size() - 1;
        while (left <= right) {
            size_t middle = left + (right - left) / 2;

            if (data[middle] == value)
                return middle;

            if (data[middle] < value)
                left = middle + 1;
            else
                right = middle - 1;
        }
        throw std::domain_error("not found");
    }
}  // namespace binary_search