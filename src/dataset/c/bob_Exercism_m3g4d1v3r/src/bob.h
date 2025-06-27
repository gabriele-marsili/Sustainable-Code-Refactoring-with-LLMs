#ifndef BOB_H
#define BOB_H

#include <ctype.h>
#include <stdbool.h>
#include <string.h>

bool ends_with_question_mark(char *chr);
bool has_all_capital_letters(char *chr);
bool silent_message(char *chr);

char *hey_bob(char *greeting);

#endif
