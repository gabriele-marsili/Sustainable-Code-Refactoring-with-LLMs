#include "square_root.h"

double square_root(double input) {
    if (input < 0) return -1; // Handle invalid input
    if (input == 0 || input == 1) return input;

    double x_a = 0, x_b = input, x_mid;
    const double epsilon = 1e-9;

    while ((x_b - x_a) > epsilon) {
        x_mid = (x_a + x_b) * 0.5;
        double square = x_mid * x_mid;

        if (square < input) {
            x_a = x_mid;
        } else {
            x_b = x_mid;
        }
    }
    return (x_a + x_b) * 0.5;
}