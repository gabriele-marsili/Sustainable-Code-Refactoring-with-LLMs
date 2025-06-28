#include "all_your_base.h"

namespace all_your_base {
	std::vector<unsigned int> convert(unsigned int curBas, 
		std::vector<unsigned int> dgt, unsigned int tarBas) {

		if (curBas < 2 || tarBas < 2)
			throw std::invalid_argument("Base is lower than 2");

		for (std::vector<unsigned int>::iterator it = dgt.begin(); it != dgt.end(); ++it) {
			if (*it >= curBas)
				throw std::invalid_argument("Invalud digits - equal or higher than base");
		}


		std::vector<unsigned int> digitArray;
		unsigned int pwr = 0;
		unsigned int sumTen = 0;
		for (std::vector<unsigned int>::reverse_iterator i = dgt.rbegin();
			i != dgt.rend(); ++i) {
			sumTen += *i * static_cast<unsigned int>(std::pow(curBas, pwr++));
		}

		while (sumTen > 0) {
			unsigned int rem = sumTen % tarBas;
			sumTen /= tarBas;
			digitArray.push_back(rem);
		}

		std::reverse(digitArray.begin(), digitArray.end());
		return digitArray;
	}
}  // namespace all_your_base
