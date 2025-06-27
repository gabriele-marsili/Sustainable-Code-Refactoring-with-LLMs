#include "square_root.h"

double square_root(double input) {
    // Implementation of Heron's method
    /*
    double xn;
    xn = input / 2.0;
    for (size_t n = 0; n < MAX_N; n++) {
        xn = 0.5 * (xn + input / xn);
    }
    return (xn);
    */
    double x_a = 0, x_b = input;
    double x_mid = 1;
    size_t counter = 0;

    while (x_a < x_b) {
        x_mid = (x_a + x_b) / 2.0;
        if ((x_mid * x_mid) == input) {
            return (x_mid);
        } else if ((x_mid * x_mid) < input) {
            x_a = x_mid;
        } else {
            x_b = x_mid;
        }
        counter++;
    }
    return (x_mid);
}
