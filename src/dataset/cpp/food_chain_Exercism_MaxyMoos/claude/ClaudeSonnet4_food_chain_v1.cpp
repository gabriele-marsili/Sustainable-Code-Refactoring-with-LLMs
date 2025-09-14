#include "food_chain.h"

using namespace std;

////////////////////////
// ANIMAL UTIL CLASS
////////////////////////
animal::animal(string name, string secondLine)
    : name(std::move(name)), secondLine(std::move(secondLine)), optional(this->name)
{
}

animal::animal(string name, string secondLine, string optional)
    : name(std::move(name)), secondLine(std::move(secondLine)), optional(optional.empty() ? this->name : std::move(optional))
{
}

static const animal animals[8]{
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
    const auto& animal = animals[index-1];
    string result;
    result.reserve(256); // Pre-allocate reasonable capacity
    
    result += food_chain::firstLine;
    result += animal.name;
    result += ".\n";
    result += animal.secondLine;
    
    if (index == 8) {
        result += "She's dead, of course!\n";
    } else {
        for (int i = index-1; i > 0; --i) {
            result += "She swallowed the ";
            result += animals[i].name;
            result += " to catch the ";
            result += animals[i-1].optional;
            result += ".\n";
        }
        result += food_chain::finalStr;
    }
    return result;
}

string food_chain::verses(int lowIndex, int highIndex)
{
    string result;
    result.reserve(1024 * (highIndex - lowIndex + 1)); // Pre-allocate capacity
    
    for (int i = lowIndex; i <= highIndex; ++i) {
        result += food_chain::verse(i);
        result += "\n";
    }
    return result;
}

string food_chain::sing()
{
    return food_chain::verses(1, 8);
}