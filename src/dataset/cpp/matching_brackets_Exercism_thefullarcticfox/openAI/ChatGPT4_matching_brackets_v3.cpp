#include "matching_brackets.h"
#include <stack>
#include <unordered_map>

namespace matching_brackets {
	bool check(const std::string& str) {
		static const std::unordered_map<char, char> bracket_pairs{ {'[', ']'}, {'{', '}'}, {'(', ')'} };
		std::stack<char> brackets;

		for (char c : str) {
			if (bracket_pairs.find(c) != bracket_pairs.end()) {
				brackets.push(bracket_pairs.at(c));
			} else if (c == ']' || c == '}' || c == ')') {
				if (brackets.empty() || c != brackets.top()) {
					return false;
				}
				brackets.pop();
			}
		}
		return brackets.empty();
	}
}  // namespace matching_brackets