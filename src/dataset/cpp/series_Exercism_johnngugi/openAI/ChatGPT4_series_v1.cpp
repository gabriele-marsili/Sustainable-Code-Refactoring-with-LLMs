#include "series.h"
#include <stdexcept>
#include <vector>

using namespace std;

namespace series {

    vector<int> digits(const string& num) {
        vector<int> result;
        result.reserve(num.size()); // Reserve memory to avoid reallocations

        for (char i : num) {
            result.push_back(i - '0');
        }
        return result;
    }

    vector<vector<int>> slice(const string& num, int n) {
        if (n > static_cast<int>(num.length())) {
            throw domain_error("Not enough digits to slice");
        }

        vector<vector<int>> result;
        result.reserve(num.length() - n + 1); // Reserve memory for slices

        for (size_t i = 0; i <= num.length() - n; ++i) {
            result.emplace_back(num.begin() + i, num.begin() + i + n);
        }

        return result;
    }
}