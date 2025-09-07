#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

double calculate_average(const std::vector<int>& data) {
    if (data.empty()) {
        return 0.0;
    }
    double sum = std::accumulate(data.begin(), data.end(), 0.0);
    return sum / data.size();
}

std::vector<int> filter_even_numbers(const std::vector<int>& data) {
    std::vector<int> even_numbers;
    even_numbers.reserve(data.size()); // Pre-allocate memory
    for (int value : data) {
        if (value % 2 == 0) {
            even_numbers.push_back(value);
        }
    }
    return even_numbers;
}

void process_data(std::vector<int>& data) {
    // Calculate the average of all numbers
    double average = calculate_average(data);
    std::cout << "Average: " << average << std::endl;

    // Filter out even numbers
    std::vector<int> even_numbers = filter_even_numbers(data);
    std::cout << "Even numbers: ";
    for (int value : even_numbers) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    // Sort the original data
    std::sort(data.begin(), data.end());
    std::cout << "Sorted data: ";
    for (int value : data) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
}

int main() {
    std::vector<int> data = {5, 2, 8, 1, 9, 4, 7, 6, 3};
    process_data(data);
    return 0;
}