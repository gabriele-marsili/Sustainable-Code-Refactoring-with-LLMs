#include "grains.h"

namespace grains {
    unsigned long long square(int n)
    {
        return 1ULL << (n - 1);
    }

    unsigned long long total() {
        // For an 8x8 board with N=64 squares: (2 to the power of 64) - 1

        // In other words, a full ULL on x64 Windows:
        return 0xffff'ffff'ffff'ffff;
        
        // MAX ULL in decimal: 18,446,744,073,709,551,615 
    }
}  // namespace grains
