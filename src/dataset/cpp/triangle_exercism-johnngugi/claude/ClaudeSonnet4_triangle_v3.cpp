#include "triangle.h"
#include <stdexcept>

namespace triangle
{
    triangles_t kind(double a, double b, double c)
    {
        if (a <= 0 || b <= 0 || c <= 0 || 
            (a + b) <= c || (a + c) <= b || (b + c) <= a)
        {
            throw std::domain_error("Error");
        }
        
        if (a == b && b == c)
        {
            return equilateral;
        }
        
        if (a == b || b == c || a == c)
        {
            return isosceles;
        }
        
        return scalene;
    }
}