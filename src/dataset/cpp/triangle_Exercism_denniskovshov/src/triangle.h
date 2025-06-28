#if !defined(TRIANGLE_H)
#define TRIANGLE_H

namespace triangle {
    enum class flavor {
        undefined,
        equilateral,
        isosceles,
        scalene,
        degenerate
    };

    flavor kind(double side1, double side2, double side3);
    void validate(double side1, double side2, double side3);
}  // namespace triangle

#endif // TRIANGLE_H