#include "food_chain.h"
#include <string>
#include <array>

using namespace std;

const array<string, 9> key_word = {
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

const array<string, 9> second_line = {
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

const string first_sentence = "I know an old lady who swallowed ";
const string ending = "I don't know why she swallowed the fly. Perhaps she'll die.\n";
const string spider_line = "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";

string food_chain::repetition(int n) {
    string result;
    result.reserve(n * 60); 

    for (int i = n; i > 2; --i) {
        result += "She swallowed the " + key_word[i] + " to catch the " + key_word[i - 1] + ".\n";
    }
    result += spider_line;

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
    string result;
    if (n < 8) {
        result = first_sentence + " " + second_line[n] + response(n) + ending;
    } else {
        result = "I know an old lady who swallowed a horse.\nShe's dead, of course!\n";
    }

    return result;
}

string food_chain::verses(int a, int b) {
    string result;
    for (int i = a; i <= b; ++i) {
        result += food_chain::verse(i);
        if (i < b) {
            result += "\n";
        }
    }
    return result;
}

string food_chain::sing() {
    return food_chain::verses(1, 8);
}