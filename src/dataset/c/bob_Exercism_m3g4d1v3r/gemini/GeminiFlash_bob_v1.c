#include "bob.h"
#include <ctype.h>
#include <stdbool.h>
#include <stddef.h>

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
        } else if (isupper((unsigned char)*chr)) {
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
    char *ptr = greeting;
    bool has_lowercase = false;
    bool has_uppercase = false;
    bool has_non_space = false;
    char last_char_before_trailing_spaces = '\0';

    if (*ptr == '\0') {
        return "Fine. Be that way!";
    }

    while (*ptr != '\0') {
        if (islower((unsigned char)*ptr)) {
            has_lowercase = true;
            has_non_space = true;
        } else if (isupper((unsigned char)*ptr)) {
            has_uppercase = true;
            has_non_space = true;
        } else if (!isspace((unsigned char)*ptr)) {
            has_non_space = true;
        }

        if (!isspace((unsigned char)*ptr)) {
            last_char_before_trailing_spaces = *ptr;
        }
        ptr++;
    }

    bool question = (last_char_before_trailing_spaces == '?');
    bool capital = (!has_lowercase && has_uppercase);
    bool silent = !has_non_space;

    if (question && !capital) {
        return "Sure.";
    } else if (!question && capital) {
        return "Whoa, chill out!";
    } else if (question && capital) {
        return "Calm down, I know what I'm doing!";
    } else if (silent) {
        return "Fine. Be that way!";
    }
    return "Whatever.";
}