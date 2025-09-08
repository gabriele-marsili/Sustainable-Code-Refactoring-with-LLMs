#include "pascals_triangle.h"

namespace pascals_triangle {
std::vector<std::vector<int>> generate_rows(size_t n) {
  std::vector<std::vector<int>> res;
  if (n == 0) return res;

  res.reserve(n);

  res.push_back({1});
  if (n == 1) return res;

  res.push_back({1, 1});
  if (n == 2) return res;

  for (size_t i = 2; i < n; ++i) {
    std::vector<int> row;
    row.reserve(i + 1);
    row.push_back(1);

    const std::vector<int>& prev_row = res[i - 1];
    for (size_t j = 1; j < i; ++j) {
      row.push_back(prev_row[j - 1] + prev_row[j]);
    }

    row.push_back(1);
    res.push_back(std::move(row));
  }

  return res;
}
}  // namespace pascals_triangle