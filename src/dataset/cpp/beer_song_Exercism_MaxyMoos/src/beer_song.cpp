#include "beer_song.h"

using namespace std;

string beer::verse(int index)
{
    string result = "";
    int i = index;
    if (i > 2)
    {
        result = to_string(index) + " bottles of beer on the wall, " + to_string(index) + " bottles of beer.\n";
        result += "Take one down and pass it around, " + to_string(index-1) + " bottles of beer on the wall.\n";
    }
    else if (i == 2)
        result += "2 bottles of beer on the wall, 2 bottles of beer.\n"
                "Take one down and pass it around, 1 bottle of beer on the wall.\n";
    else if (i == 1)
        result += "1 bottle of beer on the wall, 1 bottle of beer.\n"
                "Take it down and pass it around, no more bottles of beer on the wall.\n";
    else
        result = "No more bottles of beer on the wall, no more bottles of beer.\n"
                "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
    return result;
}

string beer::sing(int maxIndex, int minIndex)
{
    string result = "";
    for (int i = maxIndex; i >= minIndex; i--)
    {
        result += beer::verse(i);
        if (i > minIndex)
            result += "\n";
    }
    return result;
}

string beer::sing(int index)
{
    return beer::sing(index, 0);
}