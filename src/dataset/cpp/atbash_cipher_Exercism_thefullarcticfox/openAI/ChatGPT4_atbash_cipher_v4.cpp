#include "atbash_cipher.h"
#include <cctype>
#include <string>

namespace atbash_cipher {
	inline char cipher_char(char c) {
		return std::isalpha(c) ? ('z' - std::tolower(c) + 'a') : c;
	}

	std::string encode(const std::string& str) {
		std::string res;
		res.reserve(str.size()); // Reserve memory to avoid reallocations
		int alnumcount = 0;

		for (char letter : str) {
			if (std::isalnum(letter)) {
				if (alnumcount > 0 && alnumcount % 5 == 0) {
					res.push_back(' ');
				}
				res.push_back(cipher_char(letter));
				++alnumcount;
			}
		}
		return res;
	}

	std::string decode(const std::string& str) {
		std::string res;
		res.reserve(str.size()); // Reserve memory to avoid reallocations

		for (char letter : str) {
			if (std::isalnum(letter)) {
				res.push_back(cipher_char(letter));
			}
		}
		return res;
	}
}  // namespace atbash_cipher