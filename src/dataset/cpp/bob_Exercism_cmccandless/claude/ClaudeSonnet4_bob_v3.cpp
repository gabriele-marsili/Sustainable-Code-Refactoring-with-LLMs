#include "bob.h"

string bob::hey(string input)
{
    if (input.empty()) return "Fine. Be that way!";
    
    int end = input.length() - 1;
    while (end >= 0 && input[end] == ' ') end--;
    
    if (end < 0) return "Fine. Be that way!";
    
    bool hasLetter = false;
    bool isShouting = false;
    
    for (int i = 0; i <= end; i++)
    {
        char ch = input[i];
        if (isalpha(ch))
        {
            hasLetter = true;
            if (isupper(ch))
            {
                isShouting = true;
            }
            else
            {
                isShouting = false;
                break;
            }
        }
    }
    
    if (hasLetter && isShouting) return "Whoa, chill out!";
    if (input[end] == '?') return "Sure.";
    return "Whatever.";
}