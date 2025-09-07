#include "square_root.h"

double square_root(double input) {
    if (input < 0) return -1; // Handle invalid input
    if (input == 0 || input == 1) return input; // Handle edge cases

    double x_a = 0, x_b = input > 1 ? input : 1; // Adjust bounds for inputs < 1
    double x_mid;

    while ((x_b - x_a) > 1e-9) { // Use a small epsilon for precision
        x_mid = (x_a + x_b) * 0.5;
        double x_mid_squared = x_mid * x_mid;

        if (x_mid_squared == input) {
            return x_mid;
        } else if (x_mid_squared < input) {
            x_a = x_mid;
        } else {
            x_b = x_mid;
        }
    }
    return (x_a + x_b) * 0.5; // Return the midpoint for final approximation
}