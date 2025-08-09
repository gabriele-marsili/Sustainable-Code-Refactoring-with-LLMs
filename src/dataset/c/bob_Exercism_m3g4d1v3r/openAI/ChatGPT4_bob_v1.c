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
    bool capital_flag = false;
    char c;

    while ((c = *chr++) != '\0') {
        if (c >= 'a' && c <= 'z')
            return false;
        else if (c >= 'A' && c <= 'Z')
            capital_flag = true;
    }
    return capital_flag;
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
    else if (capital)
        return "Whoa, chill out!";
    else if (question)
        return "Sure.";
    return "Whatever.";
}