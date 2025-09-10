#include "matching_brackets.h"
#include <stack>
#include <unordered_map>

namespace matching_brackets {
	bool check(const std::string& str) {
		constexpr char bracket_pairs[128] = {};
		bracket_pairs['['] = ']';
		bracket_pairs['{'] = '}';
		bracket_pairs['('] = ')';

		std::stack<char> brackets;

		for (char c : str) {
			if (bracket_pairs[c]) {
				brackets.push(bracket_pairs[c]);
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