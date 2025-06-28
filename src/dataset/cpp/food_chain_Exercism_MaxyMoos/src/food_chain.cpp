#include "food_chain.h"

using namespace std;

////////////////////////
// ANIMAL UTIL CLASS
////////////////////////
animal::animal(string name, string secondLine)
{
    this->name = name;
    this->secondLine = secondLine;
    this->optional = name;
}

animal::animal(string name, string secondLine, string optional)
{
    this->name = name;
    this->secondLine = secondLine;
    if (optional.compare("") != 0)
        this->optional = optional;
}

static animal Fly("fly", "");
static animal Spider("spider", "It wriggled and jiggled and tickled inside her.\n", "spider that wriggled and jiggled and tickled inside her");
static animal Bird("bird", "How absurd to swallow a bird!\n");
static animal Cat("cat", "Imagine that, to swallow a cat!\n");
static animal Dog("dog", "What a hog, to swallow a dog!\n");
static animal Goat("goat", "Just opened her throat and swallowed a goat!\n");
static animal Cow("cow", "I don't know how she swallowed a cow!\n");
static animal Horse("horse", "");

static animal animals[8]{Fly, Spider, Bird, Cat, Dog, Goat, Cow, Horse};


///////////////////////////
// MAIN COURSE IS HERE
///////////////////////////


string food_chain::verse(int index)
{
    string result = "";
    result += food_chain::firstLine + animals[index-1].name + ".\n" + animals[index-1].secondLine;
    
    if (index == 8)
        result += "She's dead, of course!\n";
    else
    {
        for (int i = index-1; i != 0 ; i--)
        {
            result += "She swallowed the " + animals[i].name + " to catch the " + animals[i-1].optional + ".\n";
        }
        result += food_chain::finalStr;
    }
    return result;
}

string food_chain::verses(int lowIndex, int highIndex)
{
    string result = "";
    for (int i = lowIndex ; i <= highIndex ; i++)
    {
        result += food_chain::verse(i) + "\n";
    }
    return result;
}

string food_chain::sing()
{
    return food_chain::verses(1,8);
}