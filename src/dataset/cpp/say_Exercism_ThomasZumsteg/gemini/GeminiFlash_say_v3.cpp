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

std::vector<int> filter_positive(const std::vector<int>& data) {
    std::vector<int> positive_data;
    for (int value : data) {
        if (value > 0) {
            positive_data.push_back(value);
        }
    }
    return positive_data;
}

int find_max(const std::vector<int>& data) {
    if (data.empty()) {
        return -1; 
    }
    int max_value = data[0];
    for (size_t i = 1; i < data.size(); ++i) {
        if (data[i] > max_value) {
            max_value = data[i];
        }
    }
    return max_value;
}