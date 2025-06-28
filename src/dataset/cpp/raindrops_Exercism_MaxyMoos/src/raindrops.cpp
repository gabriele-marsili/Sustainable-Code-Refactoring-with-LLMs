#include "raindrops.h"

using namespace std;

string raindrops::convert(int number)
{
    string result = "";
    if ( number % 3 == 0 )
        result += "Pling";
    if ( number % 5 == 0 )
        result += "Plang";
    if ( number % 7 == 0 )
        result += "Plong";
    if (result.length() == 0)
        result = to_string(number);
    return result;
}
