#include <stack>
#include <string>
#include "bracket_push.h"

namespace bracket_push {

    inline bool are_matching(char opening, char closing) {
        return (opening == '(' && closing == ')') ||
               (opening == '{' && closing == '}') ||
               (opening == '[' && closing == ']');
    }

    bool check(const std::string& text) {
        std::stack<char> braces;

        for (char ch : text) {
            switch (ch) {
                case '(':
                case '{':
                case '[':
                    braces.push(ch);
                    break;
                case ')':
                case '}':
                case ']':
                    if (braces.empty() || !are_matching(braces.top(), ch)) return false;
                    braces.pop();
                    break;
            }
        }

        return braces.empty();
    }
}