#include "say.h"
#include <vector>
#include <string>
#include <algorithm>
#include <stdexcept>

using namespace std;

string say_number(string numItem) {
    string result = "";
    int num = stoi(numItem);

    if (num >= 100) {
        int hundreds = num / 100;
        result += say::units[hundreds] + " hundred ";
        num %= 100;
    }

    if (num > 0) {
        if (num < 20) {
            result += say::units[num];
        } else {
            int tens = num / 10;
            int ones = num % 10;
            result += say::tens[tens];
            if (ones != 0) {
                result += "-" + say::units[ones];
            }
        }
    }

    return result;
}

string say::in_english(ull num) {
    if (num < 0 || num >= 1000000000000ULL)
        throw std::domain_error("Not in range");

    if (num == 0) return "zero";

    string result = "";
    vector<string> groups;
    string numStr = to_string(num);

    size_t len = numStr.length();
    for (size_t i = 0; i < len; i += 3) {
        size_t start = (len > 3 + i) ? len - 3 - i : 0;
        size_t count = (len > 3 + i) ? 3 : len - i;
        groups.push_back(numStr.substr(start, count));
    }

    const char* suffixes[] = {"", " thousand", " million", " billion"};
    int numGroups = groups.size();

    for (int i = numGroups - 1; i >= 0; --i) {
        string tmp = say_number(groups[i]);
        if (!tmp.empty()) {
            result += tmp + suffixes[numGroups - 1 - i];
            if (i > 0) result += " ";
        }
    }

    size_t last_not_space = result.find_last_not_of(" ");
    return (last_not_space == string::npos) ? "" : result.substr(0, last_not_space + 1);
}