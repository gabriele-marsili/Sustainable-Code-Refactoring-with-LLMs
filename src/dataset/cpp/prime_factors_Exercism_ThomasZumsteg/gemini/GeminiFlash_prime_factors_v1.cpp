#include <iostream>
#include <vector>
#include <algorithm>

int main() {
  std::ios_base::sync_with_stdio(false);
  std::cin.tie(nullptr);

  size_t n;
  std::cin >> n;

  std::vector<int> arr(n);
  for (size_t i = 0; i < n; ++i) {
    std::cin >> arr[i];
  }

  std::sort(arr.begin(), arr.end());

  for (size_t i = 0; i < n; ++i) {
    std::cout << arr[i] << (i == n - 1 ? "" : " ");
  }
  std::cout << '\n';

  return 0;
}