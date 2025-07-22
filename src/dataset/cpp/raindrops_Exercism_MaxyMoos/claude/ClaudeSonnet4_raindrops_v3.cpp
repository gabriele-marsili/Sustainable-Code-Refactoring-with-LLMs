#include "raindrops.h"

using namespace std;

string raindrops::convert(int number)
{
    static constexpr const char* const sounds[] = {"Pling", "Plang", "Plong"};
    static constexpr int divisors[] = {3, 5, 7};
    
    string result;
    
    for (int i = 0; i < 3; ++i) {
        if (number % divisors[i] == 0) {
            result += sounds[i];
        }
    }
    
    return result.empty() ? to_string(number) : result;
}