#include "collatz_conjecture.h"
#include <iostream>
#include <stdexcept>

namespace collatz_conjecture {
	int steps(int num, int step){
		if(num < 1) {throw std::domain_error("Invalid Input");}
		if(num ==1){ return step;}
		else { return steps( num %2 ==0 ? num /2 : 3*num+1, ++step);}

	}
}  // namespace collatz_conjecture
