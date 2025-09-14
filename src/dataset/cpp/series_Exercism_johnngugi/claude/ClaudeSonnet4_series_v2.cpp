#include "series.h"
#include <stdexcept>

using namespace std;

namespace series {

    vector<int> digits(string num) {
        vector<int> result;
        result.reserve(num.size());

        for (char c : num) {
            result.push_back(c - '0');
        }
        return result;
    }

    vector<vector<int>> slice(string num, int n) {
        if (n > static_cast<int>(num.length())) {
            throw domain_error("Not enough digits to slice");
        }

        vector<vector<int>> result;
        const int num_slices = static_cast<int>(num.length()) - n + 1;
        result.reserve(num_slices);

        for (int i = 0; i <= static_cast<int>(num.length()) - n; ++i) {
            vector<int> slice_vec;
            slice_vec.reserve(n);
            
            for (int j = 0; j < n; ++j) {
                slice_vec.push_back(num[i + j] - '0');
            }
            result.push_back(move(slice_vec));
        }

        return result;
    }
}