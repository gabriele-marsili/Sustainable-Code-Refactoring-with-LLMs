#ifndef ALLERGIES_H
#define ALLERGIES_H
#include <string>
#include <unordered_set>

namespace allergies
{
	class allergy_test
	{
		public:
			allergy_test(unsigned short );
			bool is_allergic_to(std::string const&) const;
			std::unordered_set<std::string> get_allergies() const;
		private:
			unsigned short _allergie_score;
	};
}
#endif