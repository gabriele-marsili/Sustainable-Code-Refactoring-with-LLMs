#include "bob.h"

bool ends_with_question_mark(char *chr) {
    size_t idx;

    if (*chr == '\0') return (false);
    idx = 0;
    while (chr[idx++] != '\0');
    idx--;
    while (isspace(chr[--idx]) != 0) {
        if (idx == 0) break;
    }
    return (chr[idx] == '?');
}

bool has_all_capital_letters(char *chr) {
    bool capital_flag;

    capital_flag = false;
    while (*chr != '\0') {
        if (*chr >= 'a' && *chr <= 'z')
            return (false);
        else if (*chr >= 'A' && *chr <= 'Z')
            capital_flag = true;
        chr++;
    }
    return (capital_flag);
}

bool silent_message(char *chr) {
    while (*chr != '\0') {
        if (isspace(*chr) == 0) return (false);
        chr++;
    }
    return (true);
}

char *hey_bob(char *greeting) {
    bool question;
    bool capital;
    bool silent;

    question = ends_with_question_mark(greeting);
    capital = has_all_capital_letters(greeting);
    silent = silent_message(greeting);
    if (question && !capital)
        return ("Sure.");
    else if (!question && capital)
        return ("Whoa, chill out!");
    else if (question && capital)
        return ("Calm down, I know what I'm doing!");
    else if (silent)
        return ("Fine. Be that way!");
    return ("Whatever.");
}
