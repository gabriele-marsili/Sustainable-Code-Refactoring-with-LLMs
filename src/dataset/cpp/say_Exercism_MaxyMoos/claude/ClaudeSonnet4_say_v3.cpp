#include "say.h"
#include <vector>
#include <cstdlib>
#include <iostream>
#include <boost/algorithm/string.hpp>
#include <stdexcept>

using namespace std;

string say_number(const string& numItem)
{
    string result;
    result.reserve(64);
    
    int num = stoi(numItem);
    
    if (numItem.length() == 3 && numItem[0] != '0') {
        result += say::units[numItem[0] - '0'];
        result += " hundred";
        num %= 100;
        if (num > 0) result += " ";
    }
    
    if (num > 0) {
        if (num < 20) {
            result += say::units[num];
        } else {
            result += say::tens[num / 10];
            if (num % 10 != 0) {
                result += "-";
                result += say::units[num % 10];
            }
        }
    } else if (result.empty()) {
        result = say::units[0];
    }
    
    return result;
}

string say::in_english(ull num)
{
    if (num >= 1000000000000ULL)
        throw std::domain_error("Not in range");

    if (num == 0) return say::units[0];
    
    string result;
    result.reserve(256);
    
    static const string suffixes[] = {"", " thousand", " million", " billion", " trillion"};
    static const ull divisors[] = {1ULL, 1000ULL, 1000000ULL, 1000000000ULL, 1000000000000ULL};
    
    vector<int> groups;
    groups.reserve(5);
    
    ull temp = num;
    while (temp > 0) {
        groups.push_back(temp % 1000);
        temp /= 1000;
    }
    
    bool first = true;
    for (int i = groups.size() - 1; i >= 0; --i) {
        if (groups[i] > 0) {
            if (!first) result += " ";
            result += say_number(to_string(groups[i]));
            result += suffixes[i];
            first = false;
        }
    }
    
    return result;
}