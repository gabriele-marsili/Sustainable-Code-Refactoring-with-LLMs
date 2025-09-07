#include "square_root.h"

double square_root(double input) {
    if (input <= 0.0) {
        return (input == 0.0) ? 0.0 : -1.0;
    }
    
    if (input == 1.0) {
        return 1.0;
    }
    
    double xn = (input > 1.0) ? input * 0.5 : 1.0;
    double prev_xn;
    const double epsilon = 1e-15;
    
    do {
        prev_xn = xn;
        xn = 0.5 * (xn + input / xn);
    } while ((prev_xn - xn) * (prev_xn - xn) > epsilon * epsilon);
    
    return xn;
}