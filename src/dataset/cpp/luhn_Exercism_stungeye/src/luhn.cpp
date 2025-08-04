#include "luhn.h"
#include <vector>
#include <numeric>

namespace luhn {
    // Value at each position is index doubled with 9 subtract for values above 9.
    const std::vector convert{ 0,2,4,6,8,1,3,5,7,9 };

    bool valid(std::string_view number) {
        std::vector<int> luhn;
        // Convert chars to ints and throw away non-numeric values.
        for (const char c : number) {
            if (const int n = c - 48; n >= 0 && n < 10) {
                luhn.push_back(n);
            } else if (c != ' ') {
                // Found a non-numeric char that isn't a space.
                return false;
            }
        }

        // Must be greater than one numeral to validate.
        if (luhn.size() <= 1) return false;

        // Accumulate using reverse iterators. Convert every other value before summing.
        const int sum = std::accumulate(luhn.rbegin(), luhn.rend(), 0,
            [i = 0](const int s, const int n) mutable {
	            return s + (++i % 2 ? n : convert[n]);
            });

        return sum % 10 == 0;
    }

    /* C++23 Solution. Written to explore std::views, not for efficiency.
	bool valid(std::string_view number) {
        if (number.length() <= 1) return false;

        auto rng = number
            | std::views::transform([](auto c) { return c - 48; })
            | std::views::filter([](auto n) { return n > 0 && n < 10; })
            | std::views::reverse
            | std::views::transform([i = 0](auto n) mutable { return (i++ % 2 == 0) ? n : n * 2; })
            | std::views::transform([](auto n) { return (n > 9) ? n - 9 : n; });

        const auto sum = std::accumulate(rng.begin(), rng.end(), 0);

        return sum % 10 == 0;
	}
    */
} // namespace luhn

