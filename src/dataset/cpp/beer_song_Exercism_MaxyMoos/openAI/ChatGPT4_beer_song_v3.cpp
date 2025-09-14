#include "beer_song.h"
#include <sstream>

using namespace std;

string beer::verse(int index)
{
    ostringstream result;
    if (index > 2)
    {
        result << index << " bottles of beer on the wall, " << index << " bottles of beer.\n"
               << "Take one down and pass it around, " << (index - 1) << " bottles of beer on the wall.\n";
    }
    else if (index == 2)
    {
        result << "2 bottles of beer on the wall, 2 bottles of beer.\n"
               << "Take one down and pass it around, 1 bottle of beer on the wall.\n";
    }
    else if (index == 1)
    {
        result << "1 bottle of beer on the wall, 1 bottle of beer.\n"
               << "Take it down and pass it around, no more bottles of beer on the wall.\n";
    }
    else
    {
        result << "No more bottles of beer on the wall, no more bottles of beer.\n"
               << "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
    }
    return result.str();
}

string beer::sing(