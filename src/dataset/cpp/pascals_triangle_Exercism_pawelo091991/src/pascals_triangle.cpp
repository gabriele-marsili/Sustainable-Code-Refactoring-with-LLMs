#include "pascals_triangle.h"

namespace pascals_triangle {

	int factorial(int num) {
		if (num > 1)
			return num * factorial(num - 1);
		else
			return 1;
	}

	std::vector<std::vector<int>> generate_rows(int rows) {
		std::vector<std::vector<int>> triangle;
		triangle.resize(rows);
		for (int i = 0; i < rows; ++i){
			for (int j = 0; j < i+1; ++j) {
				int netwon = factorial(i) / (factorial(j) * factorial(i - j));
				triangle[i].push_back(netwon);
			}
		}

		return triangle;
	}
}  // namespace pascals_triangle
