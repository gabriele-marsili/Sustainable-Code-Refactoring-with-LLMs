#include <cstring>
#include <iostream>
#include <string>
#include "bob.h"

using std::cout; using std::endl;
using std::string;

enum Response {
    TO_QUESTION,
    TO_YELLING,
    TO_YELLED_QUESTION,
    TO_SILENCE,
    DEFAULT,
};

string ResponseStrings[] {
    "Sure.",
    "Whoa, chill out!",
    "Calm down, I know what I'm doing!",
    "Fine. Be that way!",
    "Whatever.",
};

namespace bob {
    string hey(const string& orig_statement) {
        // First copy the statement removing all whitespace characters
        string statement = "";
        unsigned num_lower = 0;
        unsigned num_upper = 0;
        for (auto c : orig_statement) {
            if (isspace(c)) {
                // Don't copy
            }
            else if (ispunct(c) || isdigit(c)) {
                // Copy punctuation or numbers
                statement += c;
            }
            else if (isalpha(c)) {
                // Copy letters
                statement += c;
                if (isupper(c)) {
                    num_upper++;
                }
                else {
                    num_lower++;
                }
            }
        }

        string response = ResponseStrings[DEFAULT]; // default response

        if ((num_upper > 0) && (num_lower == 0)) {
            // Statement was yelled
            if (statement.back() == '?') {
                // Statement is also a question
                response = ResponseStrings[TO_YELLED_QUESTION];
            }
            else {
                response = ResponseStrings[TO_YELLING];
            }
        }
        else if (statement.empty()) {
            // Statement contains only whitespace
            response = ResponseStrings[TO_SILENCE];
        }
        else if (statement.back() == '?') {
            // Statement is a question
            response = ResponseStrings[TO_QUESTION];
        }

        return response;
    }
}
