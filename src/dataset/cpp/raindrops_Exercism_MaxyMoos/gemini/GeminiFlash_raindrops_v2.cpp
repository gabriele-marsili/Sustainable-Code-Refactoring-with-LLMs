#include "raindrops.h"
#include <string> // Ensure string is included
#include <vector>   // Potentially useful for a more general approach, but not strictly needed for this specific problem
#include <algorithm> // Potentially useful for a more general approach

using namespace std;

// Using a static const char array or string literals to avoid repeated string construction for "Pling", "Plang", "Plong"
// This can reduce dynamic memory allocations and improve cache locality.
static const char PLING[] = "Pling";
static const char PLANG[] = "Plang";
static const char PLONG[] = "Plong";

string raindrops::convert(int number)
{
    string result;
    // Pre-allocate memory for the result string. "PlingPlangPlong" is 15 characters,
    // so reserving 15 characters upfront prevents reallocations if all conditions are met.
    // This reduces memory overhead and improves performance.
    result.reserve(15);

    // Using if-else if structure where possible or optimizing the checks
    // The current if statements are independent, so no major change here.
    if (number % 3 == 0) {
        result.append(PLING);
    }
    if (number % 5 == 0) {
        result.append(PLANG);
    }
    if (number % 7 == 0) {
        result.append(PLONG);
    }

    // Checking if the result string is empty. If it is, convert the number to a string.
    // Otherwise, return the constructed string.
    // This conditional return is efficient.
    if (result.empty()) {
        return to_string(number);
    } else {
        return result;
    }
}