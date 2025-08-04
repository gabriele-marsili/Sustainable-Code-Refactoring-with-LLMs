#ifndef NUCLEOTIDE_COUNTS_HPP
#define NUCLEOTIDE_COUNTS_HPP
#include <string>
#include <map>



namespace dna
{

	class counter
	{
		public:
			counter(std::string const&);
		

			std::map< char, int> const& nucleotide_counts() const;
			int count(char) const;
		private:
			std::map< char, int> dnaCounts_;
	};

}





#endif