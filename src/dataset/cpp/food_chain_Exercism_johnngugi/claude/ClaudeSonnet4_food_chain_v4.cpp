#include "food_chain.h"
#include <string>
#include <string_view>
using namespace std;

namespace {
    constexpr string_view key_words[] = {
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

    constexpr string_view second_lines[] = {
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

    constexpr string_view first_sentence = "I know an old lady who swallowed";
    constexpr string_view ending = "I don't know why she swallowed the fly. Perhaps she'll die.\n";
    constexpr string_view bird_special = "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";
}

string food_chain::repetition(int n) {
    string result;
    result.reserve(200);
    
    for (int i = n; i > 2; --i) {
        result += "She swallowed the ";
        result += key_words[i];
        result += " to catch the ";
        result += key_words[i-1];
        result += ".\n";
    }
    
    result += bird_special;
    
    return result;
}

string food_chain::response(int n) {
    if (n == 2) {
        string result;
        result.reserve(50);
        result += "She swallowed the ";
        result += key_words[n];
        result += " to catch the ";
        result += key_words[n-1];
        result += ".\n";
        return result;
    }
    
    if (n > 2 && n < 8) {
        return repetition(n);
    }
    
    return "";
}

string food_chain::verse(int n) {
    string result;
    result.reserve(300);
    
    if (n < 8) {
        result += first_sentence;
        result += " ";
        result += second_lines[n];
        result += response(n);
        result += ending;
    } else {
        result += "I know an old lady who swallowed a horse.\nShe's dead, of course!\n";
    }
    
    return result;
}

string food_chain::verses(int a, int b) {
    string result;
    result.reserve(600);
    result += verse(a);
    result += "\n";
    result += verse(b);
    result += "\n";
    return result;
}

string food_chain::sing() {
    return verses(1, 8);
}