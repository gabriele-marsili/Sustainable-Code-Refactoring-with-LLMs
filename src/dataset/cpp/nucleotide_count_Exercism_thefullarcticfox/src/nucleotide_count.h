#if !defined(NUCLEOTIDE_COUNT_H)
#define NUCLEOTIDE_COUNT_H
#include <string>
#include <map>

namespace nucleotide_count {
	using namespace	std;
	class counter {
		private:
			map<char, int>	counts;
		public:
			explicit
			counter(const string& dna = "");

			const map<char, int>&	nucleotide_counts() const;
			int						count(char nucleotide) const;
	};
}  // namespace nucleotide_count

#endif // NUCLEOTIDE_COUNT_H
