#include "binary_search.h"
#include <cmath>
#include <iostream>

namespace{
	std::size_t bin_find(std::vector<int> const& data, int val, int left_pos, int right_pos){
		if( right_pos >= left_pos){
			std::size_t middle = left_pos + std::floor((right_pos - left_pos)/2);
			if(data.at(middle) == val){ return middle;}
			else if( data.at(middle) > val) { return bin_find(data, val, left_pos, middle -1);}
			else { 
				return bin_find(data, val, 1+ middle, right_pos);}
		}
		throw std::domain_error("Value not in array");
	}
	
}
std::size_t binary_search::find(std::vector<int> const& data, int val){
	return bin_find(data, val, 0, data.size()-1);
}
