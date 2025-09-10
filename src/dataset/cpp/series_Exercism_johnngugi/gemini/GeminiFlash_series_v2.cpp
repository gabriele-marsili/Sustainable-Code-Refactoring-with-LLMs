#include "series.h"
#include <stdexcept>
#include <vector>
#include <string>

using namespace std;

namespace series {

    vector<int> digits(const string& num) {
        vector<int> result;
        result.reserve(num.length());
        for (char i : num) {
            result.push_back(i - '0');
        }
        return result;
    }

    vector<vector<int>> slice(const string& num, int n) {
        if (n > num.length() || n <= 0) {
            throw domain_error("Invalid slice length");
        }

        vector<vector<int>> result;
        result.reserve(num.length() - n + 1);

        for (size_t i = 0; i <= num.length() - n; ++i) {
            vector<int> sub;
            sub.reserve(n);
            for (int j = 0; j < n; ++j) {
                sub.push_back(num[i+j] - '0');
            }
            result.push_back(sub);
        }

        return result;
    }
}