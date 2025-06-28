#ifndef PHONE_NUM_H_
#define PHONE_NUM_H

#include <string>

using namespace std;

class phone_number
{
    string refPhoneNum;
public:
    phone_number(const string input);
    operator string() const;
    string number() const;
    string area_code() const;
};


#endif