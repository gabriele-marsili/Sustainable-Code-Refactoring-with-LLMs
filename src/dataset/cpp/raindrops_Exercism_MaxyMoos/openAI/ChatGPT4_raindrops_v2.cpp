#include "raindrops.h"

string raindrops::convert(int number)
{
    if (number % 3 != 0 && number % 5 != 0 && number % 7 != 0)
        return to_string(number);

    string result;
    result.reserve(15);

    if (number % 3 == 0) result += "Pling";
    if (number % 5 == 0) result += "Plang";
    if (number % 7 == 0) result += "Plong";

    return result;
}
