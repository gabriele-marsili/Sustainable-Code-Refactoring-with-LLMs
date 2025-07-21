#include "raindrops.h"
#include <string>

namespace raindrops
{
    std::string convert(int n)
    {
        std::string result;
        result.reserve(16); // Pre-allocate memory to avoid reallocations
        
        const bool div3 = (n % 3 == 0);
        const bool div5 = (n % 5 == 0);
        const bool div7 = (n % 7 == 0);
        
        if (div3) {
            result += "Pling";
        }
        if (div5) {
            result += "Plang";
        }
        if (div7) {
            result += "Plong";
        }
        
        if (!(div3 || div5 || div7)) {
            result = std::to_string(n);
        }
        
        return result;
    }
}