#include "armstrong_numbers.h"
#include <math.h>
bool is_armstrong_number(int x){
    
int a, i, b, total, armstrong_temp;
armstrong_temp = x;
int number[8];
for (i = 0; i < 8; i++) {
    a = x % 10;
    number[i] = a;
    x = x / 10;
    if (x == 0) break;
}
if (i == 0) {
    return true;
}
i++;
b = 0;
total = 0;
while (b < i) {
    total =total+ pow(number[b],i);
    b++;
}

if (total == armstrong_temp) {
    return true;
}
else {
    return false;
}
    }

    
