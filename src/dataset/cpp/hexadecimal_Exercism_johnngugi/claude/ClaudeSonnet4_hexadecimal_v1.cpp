#include "hexadecimal.h"

using namespace std;

namespace hexadecimal {

    int convert(string hex_num) {
        int sum = 0;
        
        for (char c : hex_num) {
            sum <<= 4;
            if (c >= '0' && c <= '9') {
                sum += c - '0';
            }
            else if (c >= 'a' && c <= 'f') {
                sum += c - 'a' + 10;
            }
            else if (c >= 'A' && c <= 'F') {
                sum += c - 'A' + 10;
            }
            else {
                return 0;
            }
        }
        return sum;
    }
}