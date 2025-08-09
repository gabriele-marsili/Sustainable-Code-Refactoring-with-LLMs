#include "pangram.h"
#include <cstdint>
#include <cctype>

namespace pangram {
	bool	is_pangram(const std::string& str) {
		uint32_t letters = 0;
		for (char c : str) {
			if (std::isalpha(c)) {
				letters |= 1u << (std::tolower(c) - 'a');
				if (letters == 0x3FFFFFF) return true;
			}
		}
		return letters == 0x3FFFFFF;
	}
}  // namespace pangram