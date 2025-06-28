#include "binary.h"

namespace binary {
	int convert(std::string bin) {
		int dec = 0;
		int y = 0;
		for (std::string::reverse_iterator it = bin.rbegin(); it != bin.rend(); it++){
			int x = (*it - '0');
			if (x == 0 || x == 1) {
				int temp = x * std::pow(2, y++);
				dec += temp;
			}
			else return 0;
		}

		return dec;
	}
}  // namespace binary
