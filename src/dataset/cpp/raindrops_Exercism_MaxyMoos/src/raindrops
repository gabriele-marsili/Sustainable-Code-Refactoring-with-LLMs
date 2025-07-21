#include "raindrops.h"

using std::string;
using std::to_string;

string raindrops::convert(int number)
{
    const char* sounds[] = {"Pling", "Plang", "Plong"};
    const int factors[] = {3, 5, 7};
    
    string result;
    
    for (int i = 0; i < 3; ++i) {
        if (number % factors[i] == 0) {
            result += sounds[i];
        }
    }

    return result.empty() ? to_string(number) : result;
}
