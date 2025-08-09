#include "bob.h"

string bob::hey(string input)
{
    const int n = input.size();
    if (n == 0) return "Fine. Be that way!";
    
    int end = n - 1;
    while (end >= 0 && input[end] == ' ') --end;
    if (end < 0) return "Fine. Be that way!";
    
    bool hasLetter = false;
    bool isShouting = true;
    
    for (int i = 0; i <= end; ++i) {
        const char ch = input[i];
        if (isalpha(ch)) {
            hasLetter = true;
            if (islower(ch)) {
                isShouting = false;
                break;
            }
        }
    }
    
    if (hasLetter && isShouting) return "Whoa, chill out!";
    if (input[end] == '?') return "Sure.";
    return "Whatever.";
}