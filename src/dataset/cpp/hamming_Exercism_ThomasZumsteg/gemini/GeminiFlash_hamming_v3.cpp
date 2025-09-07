#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

double calculate_average(const std::vector<int>& data) {
    if (data.empty()) {
        return 0.0;
    }
    return static_cast<double>(std::accumulate(data.begin(), data.end(), 0)) / data.size();
}

void process_data(std::vector<int>& data) {
    if (data.empty()) return;

    std::sort(data.begin(), data.end());

    for (size_t i = 0; i < data.size(); ++i) {
        data[i] *= 2;
    }
}

std::vector<int> filter_even(const std::vector<int>& data) {
    std::vector<int> result;
    for (int x : data) {
        if (x % 2 == 0) {
            result.push_back(x);
        }
    }
    return result;
}