#include "square_root.h"

double square_root(double input) {
    if (input <= 0.0) {
        return (input == 0.0) ? 0.0 : -1.0; // Handle edge cases early
    }
    
    if (input == 1.0) {
        return 1.0; // Quick return for common case
    }
    
    // Use Newton's method (Heron's method) - faster convergence than binary search
    double x = (input > 1.0) ? input * 0.5 : 1.0; // Better initial guess
    double prev_x;
    
    do {
        prev_x = x;
        x = 0.5 * (x + input / x);
    } while ((prev_x - x) > 1e-15 && (x - prev_x) > 1e-15); // Precision-based termination
    
    return x;
}