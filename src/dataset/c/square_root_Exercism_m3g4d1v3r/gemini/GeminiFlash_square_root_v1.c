#include "square_root.h"
#include <cmath>

double square_root(double input) {
    if (input < 0) {
        return NAN; // Or throw an exception, depending on desired behavior for negative input
    }
    if (input == 0) {
        return 0;
    }

    double x_a = 0;
    double x_b = input > 1 ? input : 1; // Reduce search space for inputs < 1
    double x_mid;

    // Use a fixed number of iterations for better predictability and energy efficiency
    for (int i = 0; i < 50; ++i) { // Adjust the number of iterations as needed
        x_mid = (x_a + x_b) / 2.0;
        double square = x_mid * x_mid;

        if (fabs(square - input) < 1e-7) { // Use a tolerance for floating-point comparison
            return x_mid;
        } else if (square < input) {
            x_a = x_mid;
        } else {
            x_b = x_mid;
        }
    }

    return x_mid; // Return the closest approximation after the iterations
}