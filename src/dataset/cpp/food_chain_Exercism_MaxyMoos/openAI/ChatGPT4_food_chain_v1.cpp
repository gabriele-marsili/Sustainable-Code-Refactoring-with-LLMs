#include "food_chain.h"

using namespace std;

////////////////////////
// ANIMAL UTIL CLASS
////////////////////////
animal::animal(string name, string secondLine)
    : name(move(name)), secondLine(move(secondLine)), optional(this->name) {}

animal::animal(string name, string secondLine, string optional)
    : name(move(name)), secondLine(move(secondLine)), optional(optional.empty() ? this->name : move(optional)) {}

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
    string result = food_chain::firstLine + animals[index - 1].name + ".\n" + animals[index - 1].secondLine;

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
    result.reserve((highIndex - lowIndex + 1) * 200); // Pre-allocate memory for efficiency
    for (int i = lowIndex; i <= highIndex; ++i) {
        result += food_chain::verse(i) + "\n";
    }
    return result;
}

string food_chain::sing()
{
    return food_chain::verses(1, 8);
}