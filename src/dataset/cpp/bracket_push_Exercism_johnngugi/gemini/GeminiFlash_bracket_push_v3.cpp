#include <stack>
#include <iostream>
#include <string>
#include "bracket_push.h"

namespace bracket_push {

    bool are_matching(char opening, char closing) {
        switch (opening) {
            case '(': return closing == ')';
            case '{': return closing == '}';
            case '[': return closing == ']';
            default: return false;
        }
    }

    bool check(std::string text) {
        std::stack<char> braces;
        braces.reserve(text.length() / 2);

        for (char i : text) {
            switch (i) {
                case '(':
                case '{':
                case '[':
                    braces.push(i);
                    break;
                case ')':
                case '}':
                case ']':
                    if (braces.empty() || !are_matching(braces.top(), i)) return false;
                    braces.pop();
                    break;
                default:
                    break;
            }
        }

        return braces.empty();
    }
}