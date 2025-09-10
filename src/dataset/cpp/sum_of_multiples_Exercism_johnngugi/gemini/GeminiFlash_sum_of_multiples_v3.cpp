#include "sum_of_multiples.h"
#include <numeric>
#include <unordered_set>

using namespace std;

int sum_of_multiples::to(list<int> l, int n) {
    unordered_set<int> multiples;
    multiples.reserve(n); 

    for (int multiple_of : l) {
        if (multiple_of == 0) continue; 
        for (int i = multiple_of; i < n; i += multiple_of) {
            multiples.insert(i);
        }
    }

    return accumulate(multiples.begin(), multiples.end(), 0);
}