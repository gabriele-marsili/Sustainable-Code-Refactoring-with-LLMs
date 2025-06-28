#include "pascals_triangle.h"

namespace pascals_triangle
{
    std::vector<std::vector<int>> generate_rows(int rowCount)
    {
        std::vector<std::vector<int>> rows;
        if (rowCount > 0)
        {
            rows.push_back(std::vector<int>{1});
            for (int i = 1; i < rowCount; i++)
            {
                std::vector<int> previousRow = rows[i - 1];
                std::vector<int> row{1};
                for (int j = 1; j < (int)rows.size(); j++)
                {
                    row.push_back(previousRow[j - 1] + previousRow[j]);
                }
                row.push_back(1);
                rows.push_back(row);
            }
        }
        return rows;
    }
} // namespace pascals_triangle
