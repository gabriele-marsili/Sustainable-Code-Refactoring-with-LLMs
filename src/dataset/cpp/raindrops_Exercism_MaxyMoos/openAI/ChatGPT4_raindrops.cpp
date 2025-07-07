#include "raindrops.h"

string raindrops::convert(int number)
{
    string result;
    if ((number % 3) == 0) result.append("Pling");
    if ((number % 5) == 0) result.append("Plang");
    if ((number % 7) == 0) result.append("Plong");
    return result.empty() ? to_string(number) : result;
}
