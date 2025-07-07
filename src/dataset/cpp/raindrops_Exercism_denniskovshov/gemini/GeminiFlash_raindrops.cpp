#include <string>
#include <vector>
#include <utility> // For std::pair

namespace raindrops {

// let's pretend we only need to handle int and negative values are ok
std::string convert(int num) {
    std::string result = "";
    
    // Using a vector of pairs for extensible and maintainable factor-string mappings
    const std::vector<std::pair<int, const char*>> mappings = {
        {3, "Pling"},
        {5, "Plang"},
        {7, "Plong"}
    };

    for (const auto& mapping : mappings) {
        if (num % mapping.first == 0) {
            result += mapping.second;
        }
    }
    
    // If no factors were found, convert the number to a string
    if (result.empty()) {
        return std::to_string(num);
    }
    
    return result;
}

}  // namespace raindrops