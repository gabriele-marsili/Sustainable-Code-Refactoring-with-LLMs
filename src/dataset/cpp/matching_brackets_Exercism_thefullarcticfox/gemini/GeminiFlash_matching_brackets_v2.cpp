#include "matching_brackets.h"
#include <stack>

namespace matching_brackets {
	bool check(const std::string& str) {
		std::stack<char> brackets;

		for (char c : str) {
			if (c == '[' || c == '{' || c == '(') {
				if (c == '[') {
					brackets.push(']');
				} else if (c == '{') {
					brackets.push('}');
				} else {
					brackets.push(')');
				}
			} else if (c == ']' || c == '}' || c == ')') {
				if (brackets.empty() || c != brackets.top()) {
					return false;
				}
				brackets.pop();
			}
		}
		return brackets.empty();
	}
} // namespace matching_brackets