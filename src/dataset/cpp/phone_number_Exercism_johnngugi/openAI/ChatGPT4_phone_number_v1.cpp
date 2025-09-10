#include "phone_number.h"
#include <cctype>

phone_number::phone_number(const std::string& n) {
    final.reserve(n.size());
    for (char c : n) {
        if (std::isdigit(c)) {
            final += c;
        }
    }
}

std::string phone_number::check_valid(const std::string& n) const {
    if (n.size() == 11 && n[0] == '1') {
        return n.substr(1);
    }
    if (n.size() == 10) {
        return n;
    }
    return "0000000000";
}

std::string phone_number::area_code() const {
    return final.size() >= 10 ? final.substr(0, 3) : "000";
}

phone_number::operator std::string() const {
    std::string valid_number = number();
    return "(" + valid_number.substr(0, 3) + ") " + valid_number.substr(3, 3) + "-" + valid_number.substr(6);
}

std::string phone_number::number() const {
    return check_valid(final);
}