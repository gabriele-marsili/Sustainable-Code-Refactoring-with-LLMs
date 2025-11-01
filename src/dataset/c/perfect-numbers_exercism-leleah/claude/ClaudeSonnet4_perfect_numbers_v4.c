#include "perfect_numbers.h"

int classify_number(int num)
{
    if (num <= 0) {
        return -1;
    }
    
    if (num == 1) {
        return 3;
    }
    
    int sum = 1;
    int sqrt_num = 1;
    while (sqrt_num * sqrt_num <= num) {
        sqrt_num++;
    }
    sqrt_num--;
    
    for (int i = 2; i <= sqrt_num; i++) {
        if (num % i == 0) {
            sum += i;
            if (i != num / i) {
                sum += num / i;
            }
        }
    }
    
    if (sum == num) {
        return 1;
    } else if (sum > num) {
        return 2;
    } else {
        return 3;
    }
}