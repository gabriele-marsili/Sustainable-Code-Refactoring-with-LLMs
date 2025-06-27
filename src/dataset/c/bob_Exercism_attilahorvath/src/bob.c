#include "bob.h"
#include <ctype.h>

enum statement_type { question, yell, nothing, other, not_alpha };

const char *hey_bob(char *statement) {
    enum statement_type type = nothing;

    char c;
    char last = ' ';

    for (int i = 0; (c = statement[i]) != '\0'; i++) {
        if (!isalpha(c) && !isspace(c) && type == nothing) {
            type = not_alpha;
        }

        if (isupper(c) && (type == nothing || type == not_alpha)) {
            type = yell;
        }

        if (islower(c) && type == yell) {
            type = other;
        }

        if (!isspace(c)) {
            if (type == nothing) {
                type = other;
            }

            last = c;
        }
    }

    if (last == '?' && type != yell) {
        type = question;
    }

    switch (type) {
    case question:
        return "Sure.";
    case yell:
        return "Whoa, chill out!";
    case nothing:
        return "Fine. Be that way!";
    default:
        return "Whatever.";
    }
}
