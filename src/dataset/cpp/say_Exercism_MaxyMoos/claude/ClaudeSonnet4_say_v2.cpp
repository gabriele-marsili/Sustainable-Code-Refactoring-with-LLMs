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
    
    // Parse last 1-2 digits directly
    int rest = 0;
    if (len >= 2) {
        rest = (numItem[len-2] - '0') * 10 + (numItem[len-1] - '0');
    } else if (len == 1) {
        rest = numItem[0] - '0';
    }
    
    if (rest > 0) {
        if (rest < 20) {
            result += say::units[rest];
        } else {
            result += say::tens[rest / 10];
            if (rest % 10 != 0) {
                result += "-";
                result += say::units[rest % 10];
            }
        }
    } else if (result.empty()) {
        return "zero";
    } else {
        // Remove trailing space
        result.pop_back();
    }
    
    return result;
}

string say::in_english(ull num)
{
    if (num >= 1000000000000000ULL)
        throw std::domain_error("Not in range");

    if (num == 0) return "zero";
    
    string result;
    result.reserve(256); // Pre-allocate capacity
    
    static const string suffixes[] = {"", "thousand", "million", "billion", "trillion"};
    static const ull divisors[] = {1ULL, 1000ULL, 1000000ULL, 1000000000ULL, 1000000000000ULL};
    
    // Process from largest to smallest groups
    for (int i = 4; i >= 0; --i) {
        ull group_value = num / divisors[i];
        if (group_value > 0) {
            string group_str = to_string(group_value);
            string group_words = say_number(group_str);
            
            if (!result.empty()) {
                result += " ";
            }
            result += group_words;
            if (i > 0) {
                result += " ";
                result += suffixes[i];
            }
            
            num %= divisors[i];
        }
    }
    
    return result;
}