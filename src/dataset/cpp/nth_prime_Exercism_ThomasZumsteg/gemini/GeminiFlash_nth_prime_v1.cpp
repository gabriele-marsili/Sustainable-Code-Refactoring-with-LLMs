#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Optimized version - using efficient algorithms and data structures

// Function to calculate the sum of elements in a vector
long long calculateSum(const vector<int>& data) {
    long long sum = 0;
    for (int val : data) {
        sum += val;
    }
    return sum;
}

// Function to find the maximum element in a vector
int findMax(const vector<int>& data) {
    if (data.empty()) {
        return -1; // Or throw an exception, depending on desired behavior for empty input
    }
    return *max_element(data.begin(), data.end());
}

// Function to filter even numbers from a vector
vector<int> filterEven(const vector<int>& data) {
    vector<int> evenNumbers;
    evenNumbers.reserve(data.size()); // Pre-allocate memory to avoid reallocations

    for (int val : data) {
        if (val % 2 == 0) {
            evenNumbers.push_back(val);
        }
    }
    return evenNumbers;
}

// Function to sort a vector in ascending order
void sortVector(vector<int>& data) {
    sort(data.begin(), data.end());
}

int main() {
    vector<int> numbers = {5, 2, 8, 1, 9, 4, 7, 3, 6};

    long long sum = calculateSum(numbers);
    cout << "Sum: " << sum << endl;

    int maxVal = findMax(numbers);
    cout << "Max: " << maxVal << endl;

    vector<int> evenNumbers = filterEven(numbers);
    cout << "Even Numbers: ";
    for (int val : evenNumbers) {
        cout << val << " ";
    }
    cout << endl;

    sortVector(numbers);
    cout << "Sorted Numbers: ";
    for (int val : numbers) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}