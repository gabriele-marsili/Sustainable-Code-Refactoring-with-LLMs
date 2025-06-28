#include "armstrong_numbers.h"

namespace armstrong_numbers {
	bool is_armstrong_number(int num) {
		std::stringstream ss;
		ss << num;
		std::string temp = ss.str();
		int size = temp.size();
		int sum = 0;
		for (auto c : temp) {
			int i = (int)c - 48;
			sum += pow(i, size);
		}
		
		if (sum == num)
			return true;
		else
			return false;
	}
}  // namespace armstrong_numbers
