#include <iostream>
#include <vector>
#include <algorithm>

int main() {
  std::ios_base::sync_with_stdio(false);
  std::cin.tie(nullptr);

  size_t n;
  std::cin >> n;

  std::vector<int> data(n);
  for (size_t i = 0; i < n; ++i) {
    std::cin >> data[i];
  }

  std::sort(data.begin(), data.end());

  for (size_t i = 0; i < n; ++i) {
    std::cout << data[i] << (i == n - 1 ? "" : " ");
  }
  std::cout << '\n';

  return 0;
}