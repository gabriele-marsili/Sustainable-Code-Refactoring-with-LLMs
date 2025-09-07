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

std::vector<int> filter_even_numbers(const std::vector<int>& data) {
    std::vector<int> even_numbers;
    even_numbers.reserve(data.size());

    for (int value : data) {
        if (value % 2 == 0) {
            even_numbers.push_back(value);
        }
    }

    return even_numbers;
}

void process_data(std::vector<int>& data) {
    std::sort(data.begin(), data.end());
    data.erase(std::unique(data.begin(), data.end()), data.end());
}

int find_max(const std::vector<int>& data) {
    if (data.empty()) {
        return -1;
    }

    return *std::max_element(data.begin(), data.end());
}