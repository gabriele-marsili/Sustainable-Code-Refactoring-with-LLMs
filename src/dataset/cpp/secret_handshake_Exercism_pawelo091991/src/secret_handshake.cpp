#include "secret_handshake.h"

namespace secret_handshake {
	std::vector<std::string> commands(int num) {
		std::vector<unsigned int> digitArray;
		std::vector<std::string> stringArray;

		while (num > 0) {
			unsigned int res = num % 2;
			num /= 2;
			digitArray.push_back(res);
		}

		for (int i = 0; i < digitArray.size(); ++i) {
			if (i == 0 && digitArray[i] == 1)
				stringArray.push_back("wink");
			if (i == 1 && digitArray[i] == 1)
				stringArray.push_back("double blink");
			if (i == 2 && digitArray[i] == 1)
				stringArray.push_back("close your eyes");
			if (i == 3 && digitArray[i] == 1)
				stringArray.push_back("jump");
			if (i == 4 && digitArray[i] == 1)
				std::reverse(stringArray.begin(), stringArray.end());
		}

		return stringArray;
	}
}  // namespace secret_handshake
