#include "bob.h"
#include <ctype.h>

bool ends_with_question_mark(char *chr) {
    if (*chr == '\0') return false;

    char *end = chr;
    while (*end != '\0') end++;
    end--;
    while (end >= chr && isspace((unsigned char)*end)) end--;
    return (end >= chr && *end == '?');
}

bool has_all_capital_letters(char *chr) {
    bool has_capital = false;
    char c;

    while ((c = *chr++) != '\0') {
        if (c >= 'a' && c <= 'z')
            return false;
        if (c >= 'A' && c <= 'Z')
            has_capital = true;
    }
    return has_capital;
}

bool silent_message(char *chr) {
    char c;
    while ((c = *chr++) != '\0') {
        if (!isspace((unsigned char)c)) return false;
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