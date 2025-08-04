#include "atbash_cipher.h"

namespace atbash_cipher {
	char		cipher_char(char c) {
		if (std::isalpha(c))
			return ('z' - std::tolower(c) + 'a');
		return c;
	}

	std::string	encode(const std::string& str) {
		std::string	res;
		int			alnumcount = -1;

		for (char letter : str)
			if (std::isalnum(letter)) {
				if (++alnumcount && alnumcount % 5 == 0)
					res.push_back(' ');
				res.push_back(cipher_char(letter));
			}
		return (res);
	}

	std::string	decode(const std::string& str) {
		std::string	res;
		for (char letter : str)
			if (std::isalnum(letter))
				res.push_back(cipher_char(letter));
		return (res);
	}
}  // namespace atbash_cipher
