#include "food_chain.h"

using namespace std;

const string phrases[] = {
    "",
    "fly",
    "spider",
    "bird",
    "cat",
    "dog",
    "goat",
    "cow",
    "horse",
};

const string extras[] = {
    "",
    "I don't know why she swallowed the fly. Perhaps she'll die.",
    "wriggled and jiggled and tickled inside her.",
    "How absurd to swallow a bird!",
    "Imagine that, to swallow a cat!",
    "What a hog, to swallow a dog!",
    "Just opened her throat and swallowed a goat!",
    "I don't know how she swallowed a cow!",
    "She's dead, of course!",
};

string food_chain::verse(int n, bool root) {
    string result;
    if (root) {
        result += "I know an old lady who swallowed a ";
    } else {
        result += "She swallowed the " + phrases[n + 1] + " to catch the ";
    }
    result += phrases[n];
    if (n == 2) {
        if (root) result += ".\nIt ";
        else result += " that " + extras[n] + "\n";
    } else {
        result += ".\n";
    }
    if (root || n == 1) result += extras[n] + "\n";
    if (n < 8 && n > 1) result += verse(n - 1, false);
    return result;
}