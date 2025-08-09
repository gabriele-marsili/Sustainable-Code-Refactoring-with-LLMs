#include "bob.h"
#include <ctype.h>

enum statement_type { question, yell, nothing, other };

const char *hey_bob(char *statement) {
    enum statement_type type = nothing;
    int has_alpha = 0;
    int has_upper = 0;
    int has_lower = 0;
    char last = 0;

    for (char *p = statement; *p; ++p) {
        if (!isspace((unsigned char)*p)) {
            last = *p;
        }

        if (isalpha((unsigned char)*p)) {
            has_alpha = 1;
            if (isupper((unsigned char)*p)) {
                has_upper = 1;
            } else {
                has_lower = 1;
            }
        }
    }

    if (!last) {
        type = nothing;
    } else if (has_alpha && has_upper && !has_lower) {
        type = yell;
    } else if (last == '?') {
        type = question;
    } else {
        type = other;
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