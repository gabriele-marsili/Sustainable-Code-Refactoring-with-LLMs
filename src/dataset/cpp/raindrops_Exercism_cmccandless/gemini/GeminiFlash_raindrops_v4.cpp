#include "raindrops.h"
#include <string> // Ensure <string> is included for std::string and std::to_string
#include <vector>   // For std::vector (if needed, though not strictly for this optimization)
#include <utility>  // For std::pair (if needed, though not strictly for this optimization)

// Consider forward declaring other functions if they were present to improve compilation times.

namespace raindrops { // Use a namespace if the original code was implicitly within one, or to match raindrops.h structure.

// Optimization considerations:
// 1. Avoiding unnecessary string concatenations:
//    The current approach of appending to `result` is generally efficient due to `reserve`.
//    No significant improvement can be made here without fundamentally changing the string building.
// 2. Branch prediction: The `if` conditions are simple and predictable.
// 3. Memory allocation: `reserve` is already used to pre-allocate, minimizing reallocations.
// 4. Integer modulo operations: These are highly optimized CPU instructions.
// 5. Short-circuiting: Not applicable here as all conditions might be true.
// 6. Caching: Not relevant for this simple computation.
// 7. Loop unrolling: Not applicable as there are no loops.
// 8. Data structures: Simple string, no complex structures to optimize.
// 9. Algorithm complexity: O(1) constant time, as operations are fixed regardless of input magnitude.

// Sustainable Software Engineering Principles:
// - Energy Efficiency:
//    - Minimize computations: The current code performs only necessary checks and concatenations.
//    - Efficient data structures: `std::string` with `reserve` is efficient.
//    - Reduce I/O: No I/O operations are performed.
// - Resource Efficiency:
//    - Memory: `reserve` limits reallocations. `std::to_string` might allocate new memory, but it's unavoidable.
//    - CPU: Minimal, direct calculations.
// - Clean Code:
//    - Readability: The original code is already quite readable.
//    - Maintainability: Simple logic, easy to understand.

std::string convert(int x)
{
    std::string result;
    // Pre-allocate memory for the maximum possible "PlingPlangPlong" string.
    // This avoids reallocations during the appends.
    result.reserve(15); 

    bool is_raindrop_sound = false; // Flag to track if any sound was added.

    if (x % 3 == 0) {
        result += "Pling";
        is_raindrop_sound = true;
    }
    if (x % 5 == 0) {
        result += "Plang";
        is_raindrop_sound = true;
    }
    if (x % 7 == 0) {
        result += "Plong";
        is_raindrop_sound = true;
    }

    // Only convert to string if no sounds were appended, avoiding the `empty()` check
    // which might involve checking string length (though often optimized).
    // This slight optimization might save a negligible amount of time in cases where
    // `result` is already populated.
    if (!is_raindrop_sound) {
        result = std::to_string(x);
    }
    
    return result;
}

} // namespace raindrops