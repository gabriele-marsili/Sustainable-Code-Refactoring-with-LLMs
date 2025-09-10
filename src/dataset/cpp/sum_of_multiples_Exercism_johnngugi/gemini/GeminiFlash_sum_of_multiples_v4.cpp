#include "sum_of_multiples.h"
#include <numeric>
#include <unordered_set>

using namespace std;

int sum_of_multiples::to(list<int> l, int n) {
    unordered_set<int> multiples;
    int sum = 0;

    for (int factor : l) {
        if (factor == 0) continue; 
        for (int i = factor; i < n; i += factor) {
            if (multiples.insert(i).second) {
                sum += i;
            }
        }
    }

    return sum;
}