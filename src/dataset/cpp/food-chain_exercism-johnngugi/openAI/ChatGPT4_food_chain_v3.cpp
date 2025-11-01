#include "food_chain.h"
#include <vector>
#include <string>
#include <iostream>
using namespace std;

const string key_word[] = {
    "",
    "fly",
    "spider",
    "bird",
    "cat",
    "dog",
    "goat",
    "cow",
    "horse"
};

const string second_line[] = {
    "",
    "a fly.\n",
    "a spider.\nIt wriggled and jiggled and tickled inside her.\n",
    "a bird.\nHow absurd to swallow a bird!\n",
    "a cat.\nImagine that, to swallow a cat!\n",
    "a dog.\nWhat a hog, to swallow a dog!\n",
    "a goat.\nJust opened her throat and swallowed a goat!\n",
    "a cow.\nI don't know how she swallowed a cow!\n",
    "a horse.\nShe's dead, of course!"
};

const string first_sentence = "I know an old lady who swallowed";
const string ending = "I don't know why she swallowed the fly. Perhaps she'll die.\n";

string food_chain::repetition(int n) {
    string result;
    for (int i = n; i > 1; --i) {
        if (i == 3) {
            result += "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";
        } else {
            result += "She swallowed the " + key_word[i] + " to catch the " + key_word[i - 1] + ".\n";
        }
    }
    return result;
}

string food_chain::response(int n) {
    if (n == 2) {
        return "She swallowed the " + key_word[n] + " to catch the " + key_word[n - 1] + ".\n";
    } else if (n > 2 && n < 8) {
        return repetition(n);
    }
    return "";
}

string food_chain::verse(int n) {
    if (n == 8) {
        return "I know an old lady who swallowed a horse.\nShe's dead, of course!\n";
    }
    return first_sentence + " " + second_line[n] + response(n) + ending;
}

string food_chain::verses(int a, int b) {
    string result;
    for (int i = a; i <= b; ++i) {
        result += verse(i) + (i < b ? "\n" : "");
    }
    return result;
}

string food_chain::sing() {
    return verses(1, 8);
}