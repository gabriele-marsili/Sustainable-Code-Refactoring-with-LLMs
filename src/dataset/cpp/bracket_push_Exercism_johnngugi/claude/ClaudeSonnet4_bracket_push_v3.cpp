#include <stack>
#include <algorithm>
#include <iostream>
#include <vector>
#include "bracket_push.h"

namespace bracket_push {

    constexpr bool are_matching(char opening, char closing) noexcept {
        return (opening == '(' && closing == ')') ||
               (opening == '{' && closing == '}') ||
               (opening == '[' && closing == ']');
    }

    bool check(const std::string& text) {
        std::stack<char> braces;
        braces.reserve(text.size() / 2);

        for (const char c : text) {
            if (c == '(' || c == '{' || c == '[') {
                braces.push(c);
            } else if (c == ')' || c == '}' || c == ']') {
                if (braces.empty() || !are_matching(braces.top(), c)) {
                    return false;
                }
                braces.pop();
            }
        }

        return braces.empty();
    }
}