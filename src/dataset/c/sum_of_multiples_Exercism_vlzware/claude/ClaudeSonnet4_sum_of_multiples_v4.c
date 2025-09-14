#include "sum_of_multiples.h"
#include <stddef.h>

static int gcd(int a, int b) {
    while (b) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

static int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;
}

int sum_of_multiples(const unsigned int *multiples, const int count,
                    const int n)
{
    if (multiples == NULL || count == 0 || n <= 1)
        return 0;

    unsigned int valid_multiples[count];
    int valid_count = 0;
    
    for (int i = 0; i < count; i++) {
        if (multiples[i] > 0 && multiples[i] < n) {
            int is_duplicate = 0;
            for (int j = 0; j < valid_count; j++) {
                if (valid_multiples[j] == multiples[i] || 
                    valid_multiples[j] % multiples[i] == 0) {
                    is_duplicate = 1;
                    break;
                } else if (multiples[i] % valid_multiples[j] == 0) {
                    valid_multiples[j] = multiples[i];
                    is_duplicate = 1;
                    break;
                }
            }
            if (!is_duplicate) {
                valid_multiples[valid_count++] = multiples[i];
            }
        }
    }
    
    if (valid_count == 0)
        return 0;

    if (valid_count == 1) {
        int tmp = (n - 1) / valid_multiples[0];
        return valid_multiples[0] * tmp * (tmp + 1) / 2;
    }

    int result = 0;
    for (int mask = 1; mask < (1 << valid_count); mask++) {
        int current_lcm = 1;
        int bits = 0;
        
        for (int i = 0; i < valid_count; i++) {
            if (mask & (1 << i)) {
                current_lcm = lcm(current_lcm, valid_multiples[i]);
                if (current_lcm >= n) break;
                bits++;
            }
        }
        
        if (current_lcm < n) {
            int tmp = (n - 1) / current_lcm;
            int sum = current_lcm * tmp * (tmp + 1) / 2;
            result += (bits % 2 == 1) ? sum : -sum;
        }
    }
    
    return result;
}