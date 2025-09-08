#include <iostream>
#include <vector>
#include <algorithm>

void process_data(std::vector<int>& data) {
    if (data.empty()) return;

    std::sort(data.begin(), data.end());

    for (size_t i = 0; i < data.size(); ++i) {
        data[i] = data[i] * 2;
    }

    for (size_t i = 0; i < data.size(); ++i) {
        if (data[i] % 3 == 0) {
            data[i] = data[i] / 3;
        }
    }
}