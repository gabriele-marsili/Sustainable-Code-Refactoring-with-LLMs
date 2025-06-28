#include "phone_number.h"
#include <boost/regex.hpp>
#include <iostream>

using namespace std;


phone_number::phone_number(const string input)
{
    this->refPhoneNum = input;
}

string phone_number::number() const
{
    string digits = "";

    boost::regex num("[0-9]+");
    boost::sregex_token_iterator search(this->refPhoneNum.begin(), this->refPhoneNum.end(), num, 0);
    boost::sregex_token_iterator end;

    while ( search != end )
    {
        digits += *search;
        search++;
    }

    bool isBad = false;

    if (digits.length() < 10 or digits.length() > 11)
        isBad = true;
    else if (digits.length() == 11)
        if (digits[0] == '1')
            digits = digits.substr(1, digits.length() -1);
        else
            isBad = true;

    if (isBad)
        digits = "0000000000";
    
    return digits;
}

string phone_number::area_code() const
{
    return this->number().substr(0,3);
}

phone_number::operator string() const
{
    string digits = this->number();
    return "(" + digits.substr(0,3) + ") " + digits.substr(3,3) + "-" + digits.substr(6,4); 
}