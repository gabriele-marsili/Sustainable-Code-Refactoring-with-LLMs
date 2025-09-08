#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Optimized version
void optimized_sort(vector<int>& arr) {
    if (arr.empty()) return; // Handle empty array case

    sort(arr.begin(), arr.end());
}

// Example usage (for demonstration purposes)
int main() {
    vector<int> data = {5, 2, 8, 1, 9, 4};
    optimized_sort(data);

    for (int val : data) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}