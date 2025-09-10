#include "food_chain.h"
#include <array>

using namespace std;

////////////////////////
// ANIMAL UTIL CLASS
////////////////////////
animal::animal(string name, string secondLine) : name(name), secondLine(secondLine), optional(name) {}

animal::animal(string name, string secondLine, string optional) : name(name), secondLine(secondLine), optional(optional) {}

static const animal Fly("fly", "");
static const animal Spider("spider", "It wriggled and jiggled and tickled inside her.\n", "spider that wriggled and jiggled and tickled inside her");
static const animal Bird("bird", "How absurd to swallow a bird!\n");
static const animal Cat("cat", "Imagine that, to swallow a cat!\n");
static const animal Dog("dog", "What a hog, to swallow a dog!\n");
static const animal Goat("goat", "Just opened her throat and swallowed a goat!\n");
static const animal Cow("cow", "I don't know how she swallowed a cow!\n");
static const animal Horse("horse", "");

static const array<animal, 8> animals = {Fly, Spider, Bird, Cat, Dog, Goat, Cow, Horse};


///////////////////////////
// MAIN COURSE IS HERE
///////////////////////////


string food_chain::verse(int index)
{
    string result;
    result.reserve(256); // Pre-allocate memory to reduce reallocations

    const animal& current_animal = animals[index - 1];

    result += food_chain::firstLine;
    result += current_animal.name;
    result += ".\n";
    result += current_animal.secondLine;

    if (index == 8)
    {
        result += "She's dead, of course!\n";
    }
    else
    {
        for (int i = index - 1; i != 0; --i)
        {
            result += "She swallowed the ";
            result += animals[i].name;
            result += " to catch the ";
            result += animals[i - 1].optional;
            result += ".\n";
        }
        result += food_chain::finalStr;
    }
    return result;
}

string food_chain::verses(int lowIndex, int highIndex)
{
    string result;
    result.reserve((highIndex - lowIndex + 1) * 256); // Pre-allocate memory

    for (int i = lowIndex; i <= highIndex; ++i)
    {
        result += food_chain::verse(i);
        result += "\n";
    }
    return result;
}

string food_chain::sing()
{
    return food_chain::verses(1, 8);
}