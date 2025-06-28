#ifndef TRIANGLE_H_
#define TRIANGLE_H_

namespace triangle {
enum Triangle_Type {
  equilateral,
  isosceles,
  scalene,
};
Triangle_Type kind(const float side1, const float side2, const float side3);
}  // namespace triangle

#endif  // TRIANGLE_H_
