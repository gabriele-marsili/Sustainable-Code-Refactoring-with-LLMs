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
    if (data.empty()) return;

    std::sort(data.begin(), data.end());

    for (size_t i = 0; i < data.size(); ++i) {
        data[i] = data[i] * 2;
    }
}

int find_max(const std::vector<int>& data) {
    if (data.empty()) {
        return -1;
    }

    return *std::max_element(data.begin(), data.end());
}