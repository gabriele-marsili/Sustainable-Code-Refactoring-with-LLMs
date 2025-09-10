#include "phone_number.h"
#include <algorithm>

using namespace std;

string strip(const string& s) {
    string str;
    str.reserve(s.size());
    for (char c : s) {
        if (isdigit(c)) {
            str.push_back(c);
        }
    }
    return str;
}

phone_number::phone_number(const string num) {
    full = strip(num);
    if (full.size() != 10) {
        if (full.size() == 11 && full[0] == '1') {
            full.erase(0, 1);
        } else {
            full = "0000000000";
        }
    }
}

string phone_number::number() const {
    return full;
}

string phone_number::area_code() const {
    return full.substr(0, 3);
}

phone_number::operator string() const {
    string result;
    result.reserve(14);
    result += '(';
    result += full.substr(0, 3);
    result += ") ";
    result += full.substr(3, 3);
    result += '-';
    result += full.substr(6, 4);
    return result;
}