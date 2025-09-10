#include "series.h"
#include <stdexcept>
#include <vector>

namespace series {

    std::vector<int> digits(const std::string& num) {
        std::vector<int> result;
        result.reserve(num.size());
        for (char i : num) {
            result.push_back(i - '0');
        }
        return result;
    }

    std::vector<std::vector<int>> slice(const std::string& num, int n) {
        if (n > static_cast<int>(num.size())) {
            throw std::domain_error("Not enough digits to slice");
        }

        std::vector<std::vector<int>> result;
        result.reserve(num.size() - n + 1);

        for (size_t i = 0; i <= num.size() - n; ++i) {
            result.emplace_back(num.begin() + i, num.begin() + i + n);
        }

        return result;
    }
}