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
    result.reserve(64); // Pre-allocate reasonable capacity
    
    int len = numItem.length();
    
    if (len == 3 && numItem[0] != '0') {
        result += say::units[numItem[0] - '0'];
        result += " hundred ";
    }
    
    // Process last two digits
    int startIdx = (len == 3) ? 1 : 0;
    if (startIdx < len) {
        int rest = 0;
        for (int i = startIdx; i < len; ++i) {
            rest = rest * 10 + (numItem[i] - '0');
        }
        
        if (rest < 20) {
            if (rest == 0 && !result.empty()) {
                result.pop_back(); // Remove trailing space
                return result;
            }
            result += say::units[rest];
        }
        else {
            result += say::tens[rest / 10];
            if (rest % 10 != 0) {
                result += "-";
                result += say::units[rest % 10];
            }
        }
    }
    return result;
}

string say::in_english(ull num)
{
    if (num >= 1000000000000ULL)
        throw std::domain_error("Not in range");

    if (num == 0) return "zero";
    
    string result;
    result.reserve(256); // Pre-allocate capacity
    
    static const string suffixes[] = {"", "thousand ", "million ", "billion "};
    static const ull divisors[] = {1ULL, 1000ULL, 1000000ULL, 1000000000ULL};
    
    vector<int> groups;
    groups.reserve(4);
    
    // Extract groups of 3 digits
    ull temp = num;
    while (temp > 0) {
        groups.push_back(temp % 1000);
        temp /= 1000;
    }
    
    // Process groups from most significant to least
    for (int i = groups.size() - 1; i >= 0; --i) {
        if (groups[i] == 0) continue;
        
        string groupStr = to_string(groups[i]);
        string tmp = say_number(groupStr);
        
        if (!result.empty()) result += " ";
        result += tmp;
        if (i > 0) {
            result += " ";
            result += suffixes[i];
        }
    }
    
    // Trim trailing space if any
    if (!result.empty() && result.back() == ' ') {
        result.pop_back();
    }
    
    return result;
}