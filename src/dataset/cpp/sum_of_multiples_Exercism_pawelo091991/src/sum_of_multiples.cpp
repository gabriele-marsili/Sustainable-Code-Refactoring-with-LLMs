#include "sum_of_multiples.h"

<<<<<<< HEAD
uint32_t sum_of_multiples::to(std::pair<uint32_t, uint32_t> input, uint32_t) {
	return 0;
}
=======
uint32_t sum_of_multiples::to(std::list<uint32_t>divide, uint32_t max){

	std::list<uint32_t>numbers; 
	for(uint32_t i = 0; i < max; i++){
		for(auto d : divide){
			if(i % d == 0){
				numbers.push_back(i);
			}
		}
	}

	numbers.unique();
	uint32_t sum = std::accumulate(numbers.begin(), numbers.end(), 0);
	return sum;
}
>>>>>>> 733f2d20503743b23f6125408e037628a7cef28f
