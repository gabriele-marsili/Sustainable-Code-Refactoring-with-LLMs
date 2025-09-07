#include "square_root.h"
#include <cmath>

double square_root(double input) {
    if (input < 0) {
        return NAN; // Or throw an exception, depending on desired behavior
    }
    if (input == 0) {
        return 0;
    }

    double x_a = 0;
    double x_b = input;
    if (input < 1) {
        x_b = 1;
    }

    double x_mid;
    double tolerance = 1e-7; // Adjust tolerance as needed for desired accuracy

    while (x_b - x_a > tolerance) {
        x_mid = (x_a + x_b) / 2.0;
        double square = x_mid * x_mid;

        if (square > input) {
            x_b = x_mid;
        } else {
            x_a = x_mid;
        }
    }
    return x_a;
}