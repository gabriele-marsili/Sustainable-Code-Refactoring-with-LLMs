#include <stack>
#include <unordered_map>
#include <string>
#include "bracket_push.h"

namespace bracket_push {

    bool check(const std::string& text) {
        static const std::unordered_map<char, char> matching_braces = {
            {')', '('}, {'}', '{'}, {']', '['}
        };
        std::stack<char> braces;

        for (char ch : text) {
            if (matching_braces.count(ch)) {
                if (braces.empty() || braces.top() != matching_braces.at(ch)) return false;
                braces.pop();
            } else if (ch == '(' || ch == '{' || ch == '[') {
                braces.push(ch);
            }
        }

        return braces.empty();
    }
}