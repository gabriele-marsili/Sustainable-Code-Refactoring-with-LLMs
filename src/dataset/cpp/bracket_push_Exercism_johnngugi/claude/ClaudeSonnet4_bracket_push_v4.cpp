#include <stack>
#include <algorithm>
#include <iostream>
#include <vector>
#include "bracket_push.h"

namespace bracket_push {

    bool are_matching(char opening, char closing) {
        return (opening == '(' && closing == ')') ||
               (opening == '{' && closing == '}') ||
               (opening == '[' && closing == ']');
    }

    bool check(const std::string& text) {
        std::stack<char> braces;
        
        for (char c : text) {
            switch (c) {
                case '(':
                case '{':
                case '[':
                    braces.push(c);
                    break;
                case ')':
                case '}':
                case ']':
                    if (braces.empty() || !are_matching(braces.top(), c)) {
                        return false;
                    }
                    braces.pop();
                    break;
            }
        }
        
        return braces.empty();
    }
}