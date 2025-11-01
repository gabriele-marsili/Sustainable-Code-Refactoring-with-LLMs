#include "triangle.h"
#include <stdexcept>
#include <algorithm>

using namespace std;

namespace triangle
{
    triangles_t kind(double a, double b, double c)
    {
        if (a <= 0 || b <= 0 || c <= 0)
        {
            throw domain_error("Error");
        }

        if (a + b <= c || a + c <= b || b + c <= a)
        {
            throw domain_error("Error");
        }

        if (a == b) {
            if (b == c) {
                return equilateral;
            } else {
                return isosceles;
            }
        } else if (a == c || b == c) {
            return isosceles;
        }

        return scalene;
    }
}