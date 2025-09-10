#include "matching_brackets.h"
#include <stack>
#include <unordered_map>

namespace matching_brackets {
	bool check(const std::string& str) {
		constexpr char bracket_pairs[128] = {};
		constexpr char open_brackets[] = {'[', '{', '('};
		constexpr char close_brackets[] = {']', '}', ')'};
		std::stack<char> brackets;

		for (char c : str) {
			if (c == '[' || c == '{' || c == '(') {
				brackets.push(c);
			} else if (c == ']' || c == '}' || c == ')') {
				if (brackets.empty() || 
				    (c == ']' && brackets.top() != '[') || 
				    (c == '}' && brackets.top() != '{') || 
				    (c == ')' && brackets.top() != '(')) {
					return false;
				}
				brackets.pop();
			}
		}
		return brackets.empty();
	}
}  // namespace matching_brackets