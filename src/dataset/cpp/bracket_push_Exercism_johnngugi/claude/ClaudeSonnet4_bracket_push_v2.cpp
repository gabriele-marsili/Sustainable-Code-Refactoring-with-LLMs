#include <stack>
#include <algorithm>
#include <iostream>
#include <vector>
#include "bracket_push.h"

namespace bracket_push {

    bool check(const std::string& text) {
        std::stack<char> braces;
        braces.reserve(text.length() / 2);

        for (char c : text) {
            switch (c) {
                case '(':
                case '{':
                case '[':
                    braces.push(c);
                    break;
                case ')':
                    if (braces.empty() || braces.top() != '(') return false;
                    braces.pop();
                    break;
                case '}':
                    if (braces.empty() || braces.top() != '{') return false;
                    braces.pop();
                    break;
                case ']':
                    if (braces.empty() || braces.top() != '[') return false;
                    braces.pop();
                    break;
            }
        }

        return braces.empty();
    }
}