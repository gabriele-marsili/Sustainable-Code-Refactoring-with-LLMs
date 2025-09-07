#include "square_root.h"

int square_root(int n) {
    if (n < 2) {
        return n;
    }
    
    int x = n;
    int y = (x + 1) >> 1;
    
    while (y < x) {
        x = y;
        y = (x + n / x) >> 1;
    }
    
    return x;
}