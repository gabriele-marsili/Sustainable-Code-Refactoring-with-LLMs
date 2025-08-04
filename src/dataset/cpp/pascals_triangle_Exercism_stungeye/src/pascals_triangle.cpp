#include "pascals_triangle.h"

#include <iostream>

namespace pascals_triangle {

	Triangle generate_rows(const int number_of_rows) {
		Triangle triangle(number_of_rows);

		for (size_t row_num = 0; row_num < triangle.size(); ++row_num) {
			auto& current_row = triangle[row_num];
			
			// Ensure that the first and last position is always 1:
			current_row.resize(row_num + 1, 1);

			// Calculate all the other positions by using previous row:
			for (size_t pos = 1; pos < row_num; ++pos) {
				const auto& prev_row = triangle[row_num - 1];
				current_row[pos] = prev_row[pos - 1] + prev_row[pos];
			}
		}

		return triangle;
	}
} // namespace pascals_triangle
