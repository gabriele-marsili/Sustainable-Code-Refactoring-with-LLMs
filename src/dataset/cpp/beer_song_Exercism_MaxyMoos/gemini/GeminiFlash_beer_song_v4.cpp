#include "beer_song.h"

#include <string>
#include <sstream>

using namespace std;

string beer::verse(int index) {
    stringstream result;
    switch (index) {
        case 0:
            result << "No more bottles of beer on the wall, no more bottles of beer.\n"
                   << "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
            break;
        case 1:
            result << "1 bottle of beer on the wall, 1 bottle of beer.\n"
                   << "Take it down and pass it around, no more bottles of beer on the wall.\n";
            break;
        case 2:
            result << "2 bottles of beer on the wall, 2 bottles of beer.\n"
                   << "Take one down and pass it around, 1 bottle of beer on the wall.\n";
            break;
        default:
            result << index << " bottles of beer on the wall, " << index << " bottles of beer.\n"
                   << "Take one down and pass it around, " << index - 1 << " bottles of beer on the wall.\n";
            break;
    }
    return result.str();
}

string beer::sing(int maxIndex, int minIndex) {
    stringstream result;
    for (int i = maxIndex; i >= minIndex; --i) {
        result << beer::verse(i);
        if (i > minIndex) {
            result << "\n";
        }
    }
    return result.str();
}

string beer::sing(int index) {
    return beer::sing(index, 0);
}