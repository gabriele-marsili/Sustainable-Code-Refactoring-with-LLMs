#include "hexadecimal.h"

using namespace std;

int hexadecimal::convert(string input) {
    int result = 0;
    int len = input.length();
    int powerOf16 = 1;

    // Calculate 16^(len-1) efficiently
    for (int i = 1; i < len; ++i) {
        powerOf16 *= 16;
    }

    for (int i = 0; i < len; ++i) {
        char c = input[i];
        int digitValue;

        if (c >= '0' && c <= '9') {
            digitValue = c - '0';
        } else if (c >= 'a' && c <= 'f') {
            digitValue = hexaTable[c];
        } else {
            return 0;
        }

        result += digitValue * powerOf16;
        powerOf16 /= 16;
    }

    return result;
}