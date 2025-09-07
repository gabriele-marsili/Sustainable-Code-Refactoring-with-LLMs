#include <stack>
#include <string>

namespace bracket_push {

    bool check(const std::string& text) {
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
                default:
                    break;
            }
        }

        return braces.empty();
    }
}