#include "hexadecimal.h"
#include <cctype>

namespace hexadecimal {
    int convert(const std::string& hex) {
        int res = 0;
        for (char l : hex) {
            if (std::isdigit(l)) {
                res = res * 16 + (l - '0');
            } else if (std::isxdigit(l) && std::islower(l)) {
                res = res * 16 + (l - 'a' + 10);
            } else {
                return 0;
            }
        }
        return res;
    }
}  // namespace hexadecimal