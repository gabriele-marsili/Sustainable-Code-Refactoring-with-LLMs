#include "sum_of_multiples.h"
#include <numeric>
#include <unordered_set>

using namespace std;

int sum_of_multiples::to(list<int> l, int n) {
    unordered_set<int> multiples;
    int sum = 0;

    for (int multiple_base : l) {
        if (multiple_base == 0) continue; // Avoid infinite loop

        for (int i = multiple_base; i < n; i += multiple_base) {
            if (multiples.insert(i).second) {
                sum += i;
            }
        }
    }

    return sum;
}