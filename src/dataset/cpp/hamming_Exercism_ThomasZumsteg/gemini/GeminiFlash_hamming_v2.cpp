#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Optimized function to calculate the sum of even numbers in a vector
long long sum_of_even_numbers(const vector<int>& numbers) {
    long long sum = 0;
    for (int number : numbers) {
        if ((number & 1) == 0) { // Bitwise AND is faster than modulo for checking even numbers
            sum += number;
        }
    }
    return sum;
}

// Optimized function to find the maximum element in a vector
int find_maximum(const vector<int>& numbers) {
    if (numbers.empty()) {
        return -1; // Or throw an exception, depending on the desired behavior for empty input
    }
    int max_val = numbers[0];
    for (size_t i = 1; i < numbers.size(); ++i) {
        if (numbers[i] > max_val) {
            max_val = numbers[i];
        }
    }
    return max_val;
}

// Optimized function to filter positive numbers from a vector
vector<int> filter_positive_numbers(const vector<int>& numbers) {
    vector<int> positive_numbers;
    positive_numbers.reserve(numbers.size()); // Pre-allocate memory to avoid reallocations
    for (int number : numbers) {
        if (number > 0) {
            positive_numbers.push_back(number);
        }
    }
    return positive_numbers;
}

// Optimized function to check if a number is prime
bool is_prime(int number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 == 0 || number % 3 == 0) return false;
    for (int i = 5; i * i <= number; i = i + 6)
        if (number % i == 0 || number % (i + 2) == 0)
            return false;
    return true;
}

// Optimized function to calculate the factorial of a number
long long factorial(int n) {
    if (n < 0) return -1; // Or throw an exception, depending on the desired behavior for negative input
    if (n == 0) return 1;
    long long result = 1;
    for (int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}