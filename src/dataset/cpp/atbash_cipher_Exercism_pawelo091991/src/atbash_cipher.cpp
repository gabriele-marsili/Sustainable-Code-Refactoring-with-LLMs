#include "atbash_cipher.h"

namespace atbash_cipher {
	std::string encode(std::string message) {
		std::string code = "";
		std::string data = "zyxwvutsrqponmlkjihgfedcba";
		int j = 0;
		for (auto i : message) {
			if (j == 5 && (i != '.')) {
				code += ' ';
				j = 0;
			}
			if (isalpha(i)) {
				i = tolower(i);
				code += data[i - 97];
				j++;
			}
			else if (isdigit(i)) {
				code += i;
				j++;
			}
		}
		return code;
	}

	std::string decode(std::string code) {
		code.erase(remove_if(code.begin(), code.end(), isspace), code.end());
		std::string message = "";
		std::string data = "zyxwvutsrqponmlkjihgfedcba";
		for (auto i : code) {
			if(isalpha(i))
				message += data[i - 97];
			if (isdigit(i))
				message += i;
		}
		return message;
	}
}  // namespace atbash_cipher
