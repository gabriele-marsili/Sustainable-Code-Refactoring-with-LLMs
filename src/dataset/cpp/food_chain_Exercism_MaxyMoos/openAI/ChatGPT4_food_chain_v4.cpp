#include "food_chain.h"

using namespace std;

////////////////////////
// ANIMAL UTIL CLASS
////////////////////////
animal::animal(const string& name, const string& secondLine)
    : name(name), secondLine(secondLine), optional(name) {}

animal::animal(const string& name, const string& secondLine, const string& optional)
    : name(name), secondLine(secondLine), optional(optional.empty() ? name : optional) {}

static const animal animals[] = {
    {"fly", ""},
    {"spider", "It wriggled and jiggled and tickled inside her.\n", "spider that wriggled and jiggled and tickled inside her"},
    {"bird", "How absurd to swallow a bird!\n"},
    {"cat", "Imagine that, to swallow a cat!\n"},
    {"dog", "What a hog, to swallow a dog!\n"},
    {"goat", "Just opened her throat and swallowed a goat!\n"},
    {"cow", "I don't know how she swallowed a cow!\n"},
    {"horse", ""}
};

///////////////////////////
// MAIN COURSE IS HERE
///////////////////////////

string food_chain::verse(int index)
{
    string result;
    result.reserve(256); // Reserve memory to reduce reallocations
    result += food_chain::firstLine + animals[index - 1].name + ".\n" + animals[index - 1].secondLine;

    if (index == 8) {
        result += "She's dead, of course!\n";
    } else {
        for (int i = index - 1; i > 0; --i) {
            result += "She swallowed the " + animals[i].name + " to catch the " + animals[i - 1].optional + ".\n";
        }
        result += food_chain::finalStr;
    }
    return result;
}

string food_chain::verses(int lowIndex, int highIndex)
{
    string result;
    result.reserve(1024); // Reserve memory to reduce reallocations
    for (int i = lowIndex; i <= highIndex; ++i) {
        result += verse(i) + "\n";
    }
    return result;
}

string food_chain::sing()
{
    return verses(1, 8);
}