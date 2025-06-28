#include <string>
#include "raindrops.h"

namespace raindrops {
    // let's pretend we only need to handle int and negative values are ok
    std::string convert(int num) {
        std::string result = "";
        bool has_factor = false;

        if (num % 3 == 0) {
            result += "Pling";
            has_factor = true;
        }
        
        if (num % 5 == 0) {
            result += "Plang";
            has_factor = true;
        }

        if (num % 7 == 0) {
            result += "Plong";
            has_factor = true;
        }

        if (!has_factor) {
            result = std::to_string(num);
        }

        return result;
    }
}  // namespace raindrops
