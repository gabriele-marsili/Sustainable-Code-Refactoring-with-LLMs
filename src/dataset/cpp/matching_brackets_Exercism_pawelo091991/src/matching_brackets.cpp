#include "matching_brackets.h"

namespace matching_brackets {

	bool check(std::string str) {
		std::string str_brk = "";
		for (const auto& c : str) {
			if (c == '{' || c == '[' || c == '(' || c == '}' || c == ']' || c == ')')
				str_brk += c;
		}
		while (str_brk.size() != 0) {
			char fir = str_brk[0];
			if (fir == '}' || fir == ']' || fir == ')')
				return false;

			else if ((str_brk.size() == 1) && (fir == '{' || fir == '[' || fir == '('))
				return false;

			else if (fir == '{' || fir == '[' || fir == '(') {
				bool result = erase(fir,str_brk);
				if (result == false)
					return false;
			}
			else
				return false;
		}
		return true;
	}

	bool erase(char brk, std::string& str) {
		std::map<char, char> tab = { {'{', '}'}, {'[', ']'},{'(', ')'} };
		bool result = false;
		for (int i = 1; i < str.size(); i++) {
			if (str[i] == tab[brk]) {
				result = true;
				str.erase(i, 1);
				str.erase(0, 1);
				break;
			}
		}
		return result;
	}
}  // namespace matching_brackets
