#include "phone_number.h"
#include <cctype>
using namespace std;

phone_number::phone_number(const string& n) {
    for (char c : n) {
        if (isdigit(c)) {
            final += c;
        }
    }
}

string phone_number::check_valid(const string& n) const {
    if (n.length() == 11 && n[0] == '1') {
        return n.substr(1);
    }
    if (n.length() == 10) {
        return n;
    }
    return "0000000000";
}

string phone_number::area_code() const {
    return final.substr(0, 3);
}

phone_number::operator std::string() const {
    string valid_number = number();
    return "(" + valid_number.substr(0, 3) + ") " + valid_number.substr(3, 3) + "-" + valid_number.substr(6);
}

string phone_number::number() const {
    return check_valid(final);
}