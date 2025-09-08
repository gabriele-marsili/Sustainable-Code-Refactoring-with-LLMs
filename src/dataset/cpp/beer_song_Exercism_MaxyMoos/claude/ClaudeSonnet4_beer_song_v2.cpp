#include "beer_song.h"

using namespace std;

string beer::verse(int index)
{
    if (index > 2)
    {
        string idx_str = to_string(index);
        string next_str = to_string(index - 1);
        return idx_str + " bottles of beer on the wall, " + idx_str + " bottles of beer.\n"
               "Take one down and pass it around, " + next_str + " bottles of beer on the wall.\n";
    }
    else if (index == 2)
        return "2 bottles of beer on the wall, 2 bottles of beer.\n"
               "Take one down and pass it around, 1 bottle of beer on the wall.\n";
    else if (index == 1)
        return "1 bottle of beer on the wall, 1 bottle of beer.\n"
               "Take it down and pass it around, no more bottles of beer on the wall.\n";
    else
        return "No more bottles of beer on the wall, no more bottles of beer.\n"
               "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
}

string beer::sing(int maxIndex, int minIndex)
{
    string result;
    result.reserve((maxIndex - minIndex + 1) * 120); // Pre-allocate memory
    
    for (int i = maxIndex; i >= minIndex; i--)
    {
        result += beer::verse(i);
        if (i > minIndex)
            result += '\n';
    }
    return result;
}

string beer::sing(int index)
{
    return beer::sing(index, 0);
}