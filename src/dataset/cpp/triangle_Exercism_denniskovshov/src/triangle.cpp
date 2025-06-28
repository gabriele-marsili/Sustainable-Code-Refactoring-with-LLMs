#include <stdexcept>
#include "triangle.h"

namespace triangle {
    flavor kind(double side1, double side2, double side3) {
        validate(side1, side2, side3);

        // An equilateral triangle has all three sides the same length.
        if (side1 == side2 && side2 == side3)
            return flavor::equilateral;

        // The case where the sum of the lengths of two sides equals that of the third.
        if (side1 + side2 == side3 || side1 + side3 == side2 || side2 + side3 == side1)
            return flavor::degenerate;

        // A scalene triangle has all sides of different lengths.
        if (side1 != side2 && side1 != side3 && side2 != side3)
            return flavor::scalene;

        // An isosceles triangle has at least two sides the same length.
        //if (side1 == side2 || side1 == side3 || side2 == side3)
        return flavor::isosceles;
    }

    void validate(double side1, double side2, double side3) {
        if (side1 <= 0 || side2 <= 0 || side3 <= 0)
            throw std::domain_error("All sides must be > 0");

        if (side1 + side2 < side3 || side1 + side3 < side2 || side2 + side3 < side1)
            throw std::domain_error("Sum of any two sides must be >= to the third side");
    }
}  // namespace triangle
