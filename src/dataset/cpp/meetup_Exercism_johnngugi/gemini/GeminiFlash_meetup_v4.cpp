#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int processData(const std::vector<int>& data) {
    if (data.empty()) {
        return 0;
    }

    std::vector<int> positiveValues;
    for (int value : data) {
        if (value > 0) {
            positiveValues.push_back(value);
        }
    }

    if (positiveValues.empty()) {
        return 0;
    }

    std::sort(positiveValues.begin(), positiveValues.end());

    int sum = 0;
    for (int value : positiveValues) {
        sum += value;
    }

    return sum;
}