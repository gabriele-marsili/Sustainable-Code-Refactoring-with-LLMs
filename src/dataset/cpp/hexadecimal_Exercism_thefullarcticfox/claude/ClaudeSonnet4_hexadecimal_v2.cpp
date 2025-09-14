#include "hexadecimal.h"

namespace hexadecimal {
	int convert(const std::string& hex) {
		int res = 0;
		const char* ptr = hex.data();
		const char* end = ptr + hex.size();
		
		while (ptr != end) {
			char c = *ptr++;
			int digit;
			
			if (c >= '0' && c <= '9') {
				digit = c - '0';
			} else if (c >= 'a' && c <= 'f') {
				digit = c - 'a' + 10;
			} else if (c >= 'A' && c <= 'F') {
				digit = c - 'A' + 10;
			} else {
				return 0;
			}
			
			res = (res << 4) + digit;
		}
		return res;
	}
}  // namespace hexadecimal