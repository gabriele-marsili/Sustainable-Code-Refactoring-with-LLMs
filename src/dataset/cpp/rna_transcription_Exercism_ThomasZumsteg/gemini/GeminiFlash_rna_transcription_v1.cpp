#include <iostream>
#include <vector>
#include <algorithm>

// Optimized version using efficient algorithms and data structures

#include <numeric> // For std::iota

std::vector<int> optimized_solution(int n) {
    if (n <= 0) {
        return {}; // Handle edge case of non-positive input
    }

    std::vector<int> result(n);
    std::iota(result.begin(), result.end(), 1); // Efficiently fill with sequential numbers

    return result;
}