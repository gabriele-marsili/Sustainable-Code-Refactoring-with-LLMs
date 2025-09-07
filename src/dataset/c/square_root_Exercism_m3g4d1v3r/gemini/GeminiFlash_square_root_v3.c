#include "square_root.h"
#include <cmath>
#include <limits>

double square_root(double input) {
    if (input < 0) {
        return std::numeric_limits<double>::quiet_NaN();
    }
    if (input == 0) {
        return 0;
    }

    double x_a = 0.0;
    double x_b = input > 1.0 ? input : 1.0;
    double x_mid;

    while (x_b - x_a > std::numeric_limits<double>::epsilon()) {
        x_mid = (x_a + x_b) / 2.0;
        double square = x_mid * x_mid;

        if (square > input) {
            x_b = x_mid;
        } else {
            x_a = x_mid;
        }
    }
    return (x_a + x_b) / 2.0;
}