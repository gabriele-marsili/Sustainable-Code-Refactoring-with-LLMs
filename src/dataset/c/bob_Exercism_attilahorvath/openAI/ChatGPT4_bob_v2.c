#include "bob.h"
#include <ctype.h>

enum statement_type { question, yell, nothing, other };

const char *hey_bob(char *statement) {
    enum statement_type type = nothing;
    int has_upper = 0, has_lower = 0;
    char last = 0;

    for (char *p = statement; *p; ++p) {
        if (!isspace((unsigned char)*p)) {
            last = *p;
        }

        if (isupper((unsigned char)*p)) {
            has_upper = 1;
        } else if (islower((unsigned char)*p)) {
            has_lower = 1;
        }
    }

    if (!last) {
        return "Fine. Be that way!";
    }

    if (has_upper && !has_lower) {
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