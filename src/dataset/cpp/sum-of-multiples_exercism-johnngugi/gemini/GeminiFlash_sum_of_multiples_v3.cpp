#include "sum_of_multiples.h"
#include <numeric>
#include <unordered_set>

using namespace std;

int sum_of_multiples::to(list<int> l, int n) {
    unordered_set<int> multiples;
    int sum = 0;

    for (int divisor : l) {
        if (divisor == 0) continue; 

        for (int multiple = divisor; multiple < n; multiple += divisor) {
            if (multiples.insert(multiple).second) {
                sum += multiple;
            }
        }
    }

    return sum;
}