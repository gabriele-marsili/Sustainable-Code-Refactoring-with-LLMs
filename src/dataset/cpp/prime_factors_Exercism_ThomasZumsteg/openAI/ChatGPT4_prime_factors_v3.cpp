#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

double calculate_average(const std::vector<int>& data) {
    if (data.empty()) {
        return 0.0;
    }
    double sum = std::accumulate(data.begin(), data.end(), 0.0);
    return sum / data.size();
}

void process_data(std::vector<int>& data) {
    for (size_t i = 0; i < data.size(); ++i) {
        if (data[i] % 2 == 0) {
            data[i] = data[i] / 2;
        } else {
            data[i] = data[i] * 3 + 1;
        }
    }
}

std::vector<int> filter_data(const std::vector<int>& data, int threshold) {
    std::vector<int> result;
    for (int value : data) {
        if (value > threshold) {
            result.push_back(value);
        }
    }
    return result;
}

int find_max(const std::vector<int>& data) {
    if (data.empty()) {
        return -1;
    }
    return *std::max_element(data.begin(), data.end());
}