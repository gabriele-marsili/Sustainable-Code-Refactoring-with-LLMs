#include "hexadecimal.h"

namespace hexadecimal {
	int convert(const std::string& hex) {
		int res = 0;
		const char* ptr = hex.data();
		const char* end = ptr + hex.size();
		
		while (ptr != end) {
			const char c = *ptr++;
			res <<= 4;
			
			if (c >= '0' && c <= '9') {
				res += c - '0';
			} else if (c >= 'a' && c <= 'f') {
				res += c - 'a' + 10;
			} else if (c >= 'A' && c <= 'F') {
				res += c - 'A' + 10;
			} else {
				return 0;
			}
		}
		return res;
	}
}