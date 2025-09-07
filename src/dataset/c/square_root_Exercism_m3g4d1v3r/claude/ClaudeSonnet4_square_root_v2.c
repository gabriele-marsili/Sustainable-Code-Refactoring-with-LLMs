#include "square_root.h"

double square_root(double input) {
    if (input == 0.0) return 0.0;
    if (input == 1.0) return 1.0;
    
    // Use Newton's method (Heron's method) with early termination
    double x = input * 0.5;
    double prev_x;
    const double epsilon = 1e-15;
    
    do {
        prev_x = x;
        x = 0.5 * (x + input / x);
    } while ((prev_x - x) * (prev_x - x) > epsilon * epsilon);
    
    return x;
}