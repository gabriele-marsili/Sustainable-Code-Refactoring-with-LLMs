#if !defined(NUCLEOTIDE_COUNT_H)
#define NUCLEOTIDE_COUNT_H

#include <map>
#include <string>
#include <string_view>

namespace nucleotide_count {
	class counter {
	    inline static const std::string possible_nucleotides{"ATCG"};
		std::map<char, int> counts;
	public:
		explicit counter(std::string_view sequence);
		[[nodiscard]] const std::map<char, int>& nucleotide_counts() const noexcept;
		[[nodiscard]] int count(char nucleotide) const;
	private:
		static bool invalid_nucleotide(char nucleotide) noexcept;
		void assemble_nucleotide_counts(std::string_view sequence);
	};

} // namespace nucleotide_count

#endif // NUCLEOTIDE_COUNT_H
