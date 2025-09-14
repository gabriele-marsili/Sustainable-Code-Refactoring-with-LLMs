#include "matching_brackets.h"
#include <stack>

namespace matching_brackets {
	bool	check(const std::string& str) {
		std::stack<char>	brackets;

		for (char c : str) {
			switch (c) {
				case '[':
					brackets.push(']');
					break;
				case '{':
					brackets.push('}');
					break;
				case '(':
					brackets.push(')');
					break;
				case ']':
				case '}':
				case ')':
					if (brackets.empty() || c != brackets.top())
						return false;
					brackets.pop();
					break;
			}
		}
		return brackets.empty();
	}
}  // namespace matching_brackets