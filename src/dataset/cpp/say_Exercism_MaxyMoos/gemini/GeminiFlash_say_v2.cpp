#include "say.h"
#include <vector>
#include <string>
#include <algorithm>
#include <stdexcept>

using namespace std;

string say_number(int num) {
    if (num < 0 || num > 999) {
        return ""; // Or throw an exception, depending on desired behavior
    }

    if (num == 0) {
        return "zero";
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
    int group_count = groups.size();

    for (int i = 0; i < group_count; ++i) {
        int group_value = groups[i];
        if (group_value != 0) {
            string group_string = say_number(group_value);
            result = group_string + suffixes[i] + (result.empty() ? "" : " ") + result;
        }
    }

    // Remove trailing space
    if (!result.empty() && result.back() == ' ') {
        result.pop_back();
    }

    return result;
}