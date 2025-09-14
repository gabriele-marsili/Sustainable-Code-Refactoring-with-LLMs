#include "triangle.h"
#include <stdexcept>

using namespace std;

namespace triangle
{
    triangles_t kind(double a, double b, double c)
    {
        if (a <= 0 || b <= 0 || c <= 0 || 
            (a + b) <= c || (a + c) <= b || (b + c) <= a)
        {
            throw domain_error("Error");
        }
        
        if (a == b)
        {
            return (b == c) ? equilateral : isosceles;
        }
        
        return (b == c || a == c) ? isosceles : scalene;
    }
}