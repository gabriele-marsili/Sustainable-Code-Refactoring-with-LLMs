#include "bob.h"
#include <ctype.h>
#include <stdbool.h>

const char *hey_bob(char *statement) {
    bool has_non_space_char = false;
    bool has_uppercase_char = false;
    bool has_lowercase_char = false;
    char last_non_space_char = '\0';

    for (int i = 0; statement[i] != '\0'; i++) {
        char c = statement[i];

        if (!isspace(c)) {
            has_non_space_char = true;
            last_non_space_char = c;
        }

        if (isalpha(c)) {
            if (isupper(c)) {
                has_uppercase_char = true;
            } else if (islower(c)) {
                has_lowercase_char = true;
            }
        }
    }

    if (!has_non_space_char) {
        return "Fine. Be that way!";
    }

    if (has_uppercase_char && !has_lowercase_char) {
        return "Whoa, chill out!";
    }

    if (last_non_space_char == '?') {
        return "Sure.";
    }

    return "Whatever.";
}