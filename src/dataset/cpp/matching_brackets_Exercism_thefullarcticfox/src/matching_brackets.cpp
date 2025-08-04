#include "matching_brackets.h"
#include <stack>
#include <unordered_map>

namespace matching_brackets {
	bool	check(const std::string& str) {
		std::unordered_map<char, char>	bracket_pairs{ {'[', ']'}, {'{', '}'}, {'(', ')'} };
		std::stack<char>	brackets;

		for (char c : str) {
			if (bracket_pairs.count(c))
				brackets.push(bracket_pairs.at(c));

			if (c == ']' || c == '}' || c == ')') {
				if (brackets.empty() || c != brackets.top())
					return false;
				brackets.pop();
			}
		}
		return brackets.empty();
	}
}  // namespace matching_brackets
