#include "phone_number.h"
#include <iostream>
#include <cctype>
#include <algorithm>

using namespace std;

phone_number::phone_number(const string& n) : final()
{
    final.reserve(n.length());
    for (char c : n) {
        if (isdigit(c)) {
            final.push_back(c);
        }
    }
}

string phone_number::check_valid(string n) const
{
    size_t num_length = n.length();

    if (num_length == 11)
    {
        if (n[0] == '1')
        {
            n.erase(0, 1);
        }
        else
        {
            n = "0000000000";
        }
    }
    else if (num_length < 10 || num_length > 11)
    {
        n = "0000000000";
    }

    return n;
}

string phone_number::area_code() const
{
    string valid_number = check_valid(final);
    return valid_number.substr(0, 3);
}

phone_number::operator std::string() const
{
    string s = number();
    string area = area_code();
    return "(" + area + ") " + s.substr(3, 3) + "-" + s.substr(6);
}

string phone_number::number() const
{
    return check_valid(final);
}