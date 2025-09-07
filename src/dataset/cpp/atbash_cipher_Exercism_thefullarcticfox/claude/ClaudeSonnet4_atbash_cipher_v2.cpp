#include "atbash_cipher.h"

namespace atbash_cipher {
	inline char cipher_char(char c) {
		if (c >= 'A' && c <= 'Z')
			return ('z' - (c - 'A'));
		if (c >= 'a' && c <= 'z')
			return ('z' - (c - 'a'));
		return c;
	}

	std::string	encode(const std::string& str) {
		std::string	res;
		res.reserve(str.length() + str.length() / 4);
		int			alnumcount = 0;

		for (char letter : str) {
			if ((letter >= '0' && letter <= '9') || 
				(letter >= 'A' && letter <= 'Z') || 
				(letter >= 'a' && letter <= 'z')) {
				if (alnumcount && alnumcount % 5 == 0)
					res.push_back(' ');
				res.push_back(cipher_char(letter));
				++alnumcount;
			}
		}
		return res;
	}

	std::string	decode(const std::string& str) {
		std::string	res;
		res.reserve(str.length());
		
		for (char letter : str) {
			if ((letter >= '0' && letter <= '9') || 
				(letter >= 'A' && letter <= 'Z') || 
				(letter >= 'a' && letter <= 'z')) {
				res.push_back(cipher_char(letter));
			}
		}
		return res;
	}
}  // namespace atbash_cipher