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

        double sides[3] = {a, b, c};
        sort(sides, sides + 3);

        if (sides[0] + sides[1] <= sides[2])
        {
            throw domain_error("Error");
        }

        if (a == b)
        {
            if (b == c)
            {
                return equilateral;
            }
            else
            {
                return isosceles;
            }
        }
        else if (b == c || a == c)
        {
            return isosceles;
        }
        else
        {
            return scalene;
        }
    }
}