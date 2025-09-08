#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Optimized function to calculate the sum of even numbers in a vector
long long sum_of_even(const vector<int>& nums) {
    long long sum = 0;
    for (int num : nums) {
        if ((num & 1) == 0) { // Bitwise AND is faster than modulo for checking even numbers
            sum += num;
        }
    }
    return sum;
}

// Optimized function to find the maximum element in a vector
int find_maximum(const vector<int>& nums) {
    if (nums.empty()) {
        return -1; // Or throw an exception, depending on the desired behavior for empty input
    }
    int max_val = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        if (nums[i] > max_val) {
            max_val = nums[i];
        }
    }
    return max_val;
}

// Optimized function to filter positive numbers from a vector
vector<int> filter_positive(const vector<int>& nums) {
    vector<int> positive_nums;
    positive_nums.reserve(nums.size()); // Pre-allocate memory to avoid reallocations
    for (int num : nums) {
        if (num > 0) {
            positive_nums.push_back(num);
        }
    }
    return positive_nums;
}

// Optimized function to check if a number is prime
bool is_prime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    return true;
}

// Optimized function to count prime numbers in a vector
int count_primes(const vector<int>& nums) {
    int count = 0;
    for (int num : nums) {
        if (is_prime(num)) {
            count++;
        }
    }
    return count;
}

// Optimized function to reverse a string
string reverse_string(const string& s) {
    string reversed_s = s;
    reverse(reversed_s.begin(), reversed_s.end());
    return reversed_s;
}