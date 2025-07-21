#include "raindrops.h"
#include <string> // Required for std::to_string

// Using a namespace for constants can improve readability and maintainability.
// It also avoids "magic numbers" in the code.
namespace RaindropConstants {
    const std::string PLING = "Pling";
    const std::string PLANG = "Plang";
    const std::string PLONG = "Plong";
    const int RESERVE_SIZE = 15; // "PlingPlangPlong" max length
}

std::string raindrops::convert(int x)
{
    std::string result;
    // Pre-allocating memory can reduce reallocations and improve performance,
    // especially for many calls. The initial guess of 15 is reasonable for
    // "PlingPlangPlong".
    result.reserve(RaindropConstants::RESERVE_SIZE); 
   
    // Using an if-else if-else structure here might seem intuitive, but
    // since multiple conditions can be true (e.g., divisible by 3 and 5),
    // separate if statements are necessary to append all relevant strings.
    // The current structure is optimal for this logic.
    if (x % 3 == 0) {
        result += RaindropConstants::PLING;
    }
    if (x % 5 == 0) {
        result += RaindropConstants::PLANG;
    }
    if (x % 7 == 0) {
        result += RaindropConstants::PLONG;
    }
   
    // Checking if the string is empty is efficient.
    // If no conditions were met, convert the number to a string.
    if (result.empty()) {
        return std::to_string(x); // Return directly to avoid an extra copy
    }
   
    return result;
}