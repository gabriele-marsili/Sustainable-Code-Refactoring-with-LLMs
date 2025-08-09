#include "bob.h"
#include <ctype.h>
#include <string.h>

bool ends_with_question_mark(char *chr) {
    if (*chr == '\0') return false;

    size_t len = strlen(chr);
    while (len > 0 && isspace((unsigned char)chr[len - 1])) {
        len--;
    }
    return (len > 0 && chr[len - 1] == '?');
}

bool has_all_capital_letters(char *chr) {
    bool has_capital = false;
    unsigned char c;

    while ((c = (unsigned char)*chr++) != '\0') {
        if (isalpha(c)) {
            if (islower(c)) return false;
            has_capital = true;
        }
    }
    return has_capital;
}

bool silent_message(char *chr) {
    unsigned char c;
    while ((c = (unsigned char)*chr++) != '\0') {
        if (!isspace(c)) return false;
    }
    return true;
}

char *hey_bob(char *greeting) {
    if (silent_message(greeting))
        return "Fine. Be that way!";

    bool question = ends_with_question_mark(greeting);
    bool capital = has_all_capital_letters(greeting);

    if (question && capital)
        return "Calm down, I know what I'm doing!";
    if (question)
        return "Sure.";
    if (capital)
        return "Whoa, chill out!";
    return "Whatever.";
}