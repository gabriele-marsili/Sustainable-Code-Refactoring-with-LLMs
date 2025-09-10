#include "matching_brackets.h"
#include <stack>
#include <unordered_set>

namespace matching_brackets {
	bool check(const std::string& str) {
		const std::unordered_set<char> opening_brackets{'[', '{', '('};
		const std::unordered_set<char> closing_brackets{']', '}', ')'};
		std::stack<char> brackets;

		for (char c : str) {
			if (opening_brackets.count(c)) {
				brackets.push(c);
			} else if (closing_brackets.count(c)) {
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