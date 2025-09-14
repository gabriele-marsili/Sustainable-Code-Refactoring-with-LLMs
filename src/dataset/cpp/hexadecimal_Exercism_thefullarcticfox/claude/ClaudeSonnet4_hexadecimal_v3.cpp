#include "hexadecimal.h"

namespace hexadecimal {
	int convert(const std::string& hex) {
		if (hex.empty()) return 0;
		
		int res = 0;
		const char* ptr = hex.data();
		const char* end = ptr + hex.size();
		
		while (ptr != end) {
			const char c = *ptr++;
			const int digit = (c >= '0' && c <= '9') ? (c - '0') :
							  (c >= 'a' && c <= 'f') ? (c - 'a' + 10) : -1;
			
			if (digit == -1) return 0;
			
			res = (res << 4) + digit;
		}
		
		return res;
	}
}