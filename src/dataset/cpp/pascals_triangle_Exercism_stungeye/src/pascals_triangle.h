#if !defined(PASCALS_TRIANGLE_H)
#define PASCALS_TRIANGLE_H

#include <vector>

using Triangle = std::vector<std::vector<int>>;

namespace pascals_triangle {
	Triangle generate_rows(const int number_of_rows);
}  // namespace pascals_triangle

#endif // PASCALS_TRIANGLE_H