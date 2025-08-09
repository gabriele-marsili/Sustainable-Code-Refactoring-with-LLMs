#include "bob.h"
#include <ctype.h>
#include <stdbool.h>

bool ends_with_question_mark(char *chr) {
    if (*chr == '\0') {
        return false;
    }

    char *end = chr;
    while (*end != '\0') {
        end++;
    }
    end--;

    while (end >= chr && isspace((unsigned char)*end)) {
        end--;
    }

    if (end < chr) {
        return false;
    }

    return (*end == '?');
}

bool has_all_capital_letters(char *chr) {
    bool capital_found = false;
    while (*chr != '\0') {
        if (islower((unsigned char)*chr)) {
            return false;
        }
        if (isupper((unsigned char)*chr)) {
            capital_found = true;
        }
        chr++;
    }
    return capital_found;
}

bool silent_message(char *chr) {
    while (*chr != '\0') {
        if (isspace((unsigned char)*chr) == 0) {
            return false;
        }
        chr++;
    }
    return true;
}

char *hey_bob(char *greeting) {
    bool question = ends_with_question_mark(greeting);
    bool capital = has_all_capital_letters(greeting);
    bool silent = silent_message(greeting);

    if (question && !capital) {
        return "Sure.";
    } else if (!question && capital) {
        return "Whoa, chill out!";
    } else if (question && capital) {
        return "Calm down, I know what I'm doing!";
    } else if (silent) {
        return "Fine. Be that way!";
    } else {
        return "Whatever.";
    }
}