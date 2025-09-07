#include "say.h"
#include <vector>
#include <string>
#include <stdexcept>
#include <algorithm>

using namespace std;

string say_number(int num) {
    if (num < 0 || num > 999) {
        return ""; // Or throw an exception, depending on desired behavior
    }

    string result = "";

    int hundreds = num / 100;
    if (hundreds > 0) {
        result += say::units[hundreds] + " hundred";
        num %= 100;
        if (num > 0) {
            result += " ";
        }
    }

    if (num > 0) {
        if (num < 20) {
            result += say::units[num];
        } else {
            int tens = num / 10;
            result += say::tens[tens];
            int ones = num % 10;
            if (ones > 0) {
                result += "-" + say::units[ones];
            }
        }
    }

    return result;
}

string say::in_english(ull num) {
    if (num < 0 || num >= 1000000000000ULL) {
        throw std::domain_error("Not in range");
    }

    if (num == 0) {
        return "zero";
    }

    vector<int> groups;
    while (num > 0) {
        groups.push_back(num % 1000);
        num /= 1000;
    }

    string result = "";
    const char* suffixes[] = {"", " thousand", " million", " billion"};
    size_t num_groups = groups.size();

    for (size_t i = 0; i < num_groups; ++i) {
        int group_val = groups[i];
        if (group_val != 0) {
            string group_str = say_number(group_val);
            if (!result.empty()) {
                result = group_str + suffixes[i] + " " + result;
            } else {
                result = group_str + suffixes[i];
            }
        }
    }

    // Remove trailing space
    if (!result.empty() && result.back() == ' ') {
        result.pop_back();
    }

    return result;
}