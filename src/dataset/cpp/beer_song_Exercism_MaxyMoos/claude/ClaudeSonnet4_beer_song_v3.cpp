#include "beer_song.h"

using namespace std;

string beer::verse(int index)
{
    switch (index) {
        case 0:
            return "No more bottles of beer on the wall, no more bottles of beer.\n"
                   "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
        case 1:
            return "1 bottle of beer on the wall, 1 bottle of beer.\n"
                   "Take it down and pass it around, no more bottles of beer on the wall.\n";
        case 2:
            return "2 bottles of beer on the wall, 2 bottles of beer.\n"
                   "Take one down and pass it around, 1 bottle of beer on the wall.\n";
        default:
            return to_string(index) + " bottles of beer on the wall, " + to_string(index) + 
                   " bottles of beer.\nTake one down and pass it around, " + 
                   to_string(index - 1) + " bottles of beer on the wall.\n";
    }
}

string beer::sing(int maxIndex, int minIndex)
{
    string result;
    result.reserve((maxIndex - minIndex + 1) * 150);
    
    for (int i = maxIndex; i >= minIndex; i--) {
        result += beer::verse(i);
        if (i > minIndex) {
            result += '\n';
        }
    }
    return result;
}

string beer::sing(int index)
{
    return beer::sing(index, 0);
}