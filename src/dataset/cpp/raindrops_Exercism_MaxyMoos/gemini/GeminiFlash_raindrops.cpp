#include "raindrops.h"
#include <string> // Required for std::to_string
#include <map>    // Required for std::map
using namespace std;

namespace {
    // Using a static const map to store mappings for better efficiency and readability.
    // This avoids repeated 'if' checks and makes the logic more data-driven.
    // The map is initialized once, improving performance for multiple calls to convert.
    const map<int, string> kRaindropSounds = {
        {3, "Pling"},
        {5, "Plang"},
        {7, "Plong"}
    };
}

string raindrops::convert(int number)
{
    string result = "";
    // Iterate through the predefined map of sounds.
    // This is generally more efficient than multiple 'if' statements, especially
    // if the number of conditions were to grow.
    // It also makes the code more scalable and easier to maintain.
    for (const auto& pair : kRaindropSounds) {
        if (number % pair.first == 0) {
            result += pair.second;
        }
    }

    // If no factors were found, convert the number to a string.
    // This condition check remains the same as it's efficient and clear.
    if (result.empty()) { // Using .empty() is generally preferred over .length() == 0 for clarity and intent.
        result = to_string(number);
    }

    return result;
}