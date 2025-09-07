#include "square_root.h"

double square_root(double input) {
    if (input <= 0.0) return 0.0;
    if (input == 1.0) return 1.0;
    
    double x = input * 0.5;
    double prev_x;
    
    do {
        prev_x = x;
        x = 0.5 * (x + input / x);
    } while ((prev_x - x) * (prev_x - x) > 1e-15);
    
    return x;
}