#include "raindrops.h"
#include <string>

// Using a static const map or an array of structs for compile-time initialization
// can improve efficiency by avoiding repeated map construction for each call.
// For small, fixed data like this, an array of pairs or if-else if statements
// can be even more performant as they avoid the overhead of map lookups.
// Given the priority for efficiency and speed, a direct series of if statements
// or a small, fixed array with a loop would be most optimal.
// However, to maintain a balance with maintainability (priority 3) and
// best practices (priority 4) where the mapping is clear, a static const map
// is a good compromise, ensuring it's only constructed once.
// Alternatively, for maximum speed with very few fixed conditions,
// direct if-else if checks are fastest.
// For this specific problem, the number of factors (3, 5, 7) is very small.

std::string raindrops::convert(int number) {
    std::string result;
    bool is_raindrop = false;

    if (number % 3 == 0) {
        result += "Pling";
        is_raindrop = true;
    }
    if (number % 5 == 0) {
        result += "Plang";
        is_raindrop = true;
    }
    if (number % 7 == 0) {
        result += "Plong";
        is_raindrop = true;
    }

    if (!is_raindrop) {
        return std::to_string(number);
    } else {
        return result;
    }
}