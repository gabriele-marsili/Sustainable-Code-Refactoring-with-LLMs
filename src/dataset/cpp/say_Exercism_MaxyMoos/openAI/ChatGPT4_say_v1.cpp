#include "say.h"
#include <vector>
#include <cstdlib>
#include <iostream>
#include <boost/algorithm/string.hpp>
#include <stdexcept>

using namespace std;

typedef string::reverse_iterator str_iter;

string say_number(const string& numItem) {
    string result;

    if (numItem.length() == 3 && numItem[0] != '0') {
        result += say::units[numItem[0] - '0'] + " hundred ";
    }

    int rest = stoi(numItem.substr(numItem.length() == 3 ? 1 : 0));
    if (rest > 0) {
        if (rest < 20) {
            result += say::units[rest];
        } else {
            result += say::tens[rest / 10];
            if (rest % 10 != 0) {
                result += "-" + say::units[rest % 10];
            }
        }
    }

    return result;
}

string say::in_english(ull num) {
    if (num >= 1000ULL * 1000ULL * 1000ULL * 1000ULL) {
        throw std::domain_error("Not in range");
    }

    if (num == 0) {
        return "zero";
    }

    string numStr = to_string(num);
    vector<string> groups;
    for (size_t i = numStr.size(); i > 0; i -= 3) {
        groups.push_back(numStr.substr(i >= 3 ? i - 3 : 0, i >= 3 ? 3 : i));
    }

    reverse(groups.begin(), groups.end());

    string result;
    string suffixes[]{"", "thousand ", "million ", "billion ", "trillion "};

    for (size_t i = 0; i < groups.size(); ++i) {
        string tmp = say_number(groups[i]);
        if (!tmp.empty() && tmp != "zero") {
            result += tmp + " " + suffixes[groups.size() - 1 - i];
        }
    }

    return boost::algorithm::trim_right_copy(result);
}