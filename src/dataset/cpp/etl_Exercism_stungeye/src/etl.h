#if !defined(ETL_H)
#define ETL_H

#include <vector>
#include <map>

namespace etl {

    using legacy_score_map = std::map<int, std::vector<char>>;
    using modern_score_map = std::map<char, int>;

    modern_score_map transform(const legacy_score_map& old_points);
}  // namespace etl

#endif // ETL_H