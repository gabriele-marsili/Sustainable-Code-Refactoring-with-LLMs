#include "trinary.h"
#include <iostream>
#include <string>

int trinary::to_decimal(std::string input) {
    int result = 0;
    int size = input.size();

    for (int i = 0; i < size; ++i) {
        char c = input[i];
        if (c < '0' || c > '2') {
            return 0;
        }
        result = result * 3 + (c - '0');
    }
    return result;
}